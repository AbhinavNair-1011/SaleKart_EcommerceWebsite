import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import Loader from "../../shared/components/Loader";

import useAddresses from "../address/hooks/useAddresses";
import useCart from "../cart/hooks/useCart";

import useCheckoutCOD from "./hooks/useCheckoutCOD";
import useCheckoutRazorpay from "./hooks/useCheckoutRazorpay";

import AddressSelector from "./components/AddressSelector";
import PaymentSelector from "./components/PaymentSelector";
import OrderSummary from "./components/OrderSummary";
import AddressForm from "../address/components/AddressForm";
import AddressModal from "../address/components/AddressModal";
import useCreateAddress from "../address/hooks/useCreateAddress";
import loadRazorpay from "../../shared/utils/loadRazorpay";
import useVerifyPayment from "./hooks/useVerifyPayment";

function CheckoutPage() {
  const navigate = useNavigate();

  const [showAddressForm, setShowAddressForm] = useState(false);

  const queryClient = useQueryClient();
  const { data: addressData, isLoading: addressLoading } = useAddresses();
  const { data: cartData, isLoading: cartLoading } = useCart();
  const { mutate: checkoutCOD, isPending: codPending } = useCheckoutCOD();

  const { mutate: checkoutRazorpay, isPending: razorpayPending } =
    useCheckoutRazorpay();

  const { mutate: createAddress, isPending: isCreating } = useCreateAddress();

  const addresses = addressData?.data?.addresses ?? [];
  const cart = cartData?.data?.cart ?? [];

  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { mutate: verifyPayment } = useVerifyPayment();

  if (addressLoading || cartLoading) {
    return <Loader />;
  }

  function handlePlaceOrder() {
    if (!selectedAddress) {
      return toast.error("Select an address.");
    }

    if (paymentMethod === "cod") {
      checkoutCOD(
        {
          addressId: selectedAddress,
        },
        {
          onSuccess() {
            queryClient.invalidateQueries({
              queryKey: ["cart"],
            });
            queryClient.invalidateQueries({
              queryKey: ["orders"],
            });

            toast.success("Order placed successfully.");

            navigate("/orders");
          },
          onError(error) {
            toast.error(
              error.response?.data?.error?.message ?? "Something went wrong.",
            );
          },
        },
      );

      return;
    }

    checkoutRazorpay(
      {
        addressId: selectedAddress,
      },
      {
        async onSuccess(response) {
          const loaded = await loadRazorpay();

          if (!loaded) {
            return toast.error("Unable to load Razorpay.");
          }

          const { razorpayOrderId, amount, currency, key, addressId } = response.data;

          const options = {
            key,
            amount,
            currency,
            name: "SaleKart",
            description: "Order Payment",
            order_id: razorpayOrderId,

            handler(paymentResponse) {
              verifyPayment(
                {
                  addressId,
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                },
                {
                  onSuccess() {
                    queryClient.invalidateQueries({
                      queryKey: ["cart"],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["orders"],
                    });
                    toast.success("Payment Successful"); 

                    navigate("/orders");
                  },
                  onError(error) {
                    toast.error(
                      error.response?.data?.error?.message ??
                        "Payment verification failed.",
                    );
                  },
                },
              );
            },
          };

          const razorpay = new window.Razorpay(options);

          razorpay.open();
        },
        onError(error) {
          toast.error(
            error.response?.data?.error?.message ?? "Something went wrong.",
          );
        },
      },
    );
  }

  function handleAddressCreate(formData) {
    createAddress(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["addresses"],
        });

        toast.success("Address added.");

        setShowAddressForm(false);
      },
    });
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <AddressSelector
          addresses={addresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          onAddAddress={() => setShowAddressForm(true)}
        />
        {showAddressForm && (
          <AddressModal
            onClose={() => setShowAddressForm(false)}
            title={`Add Address`}
          >
            <AddressForm
              onSubmit={handleAddressCreate}
              isPending={isCreating}
              buttonText={`Add`}
              onSuccess={() => {
                setShowAddressForm(false);
              }}
            />
          </AddressModal>
        )}

        <PaymentSelector
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>

      <OrderSummary
        cart={cart}
        onPlaceOrder={handlePlaceOrder}
        isPending={codPending || razorpayPending}
      />
    </div>
  );
}
export default CheckoutPage;
