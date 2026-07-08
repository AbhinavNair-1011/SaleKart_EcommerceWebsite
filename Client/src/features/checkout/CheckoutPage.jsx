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
<div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50/40">
  <div className="mx-auto max-w-7xl ">
    <div className="mb-6 px-6 py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
        Checkout
      </p>

      <h1 className="mt-2 text-2xl font-bold text-slate-900">
        Complete Your Order
      </h1>

      <p className="mt-2 text-slate-500">
        Review your details and place your order.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-[2fr_380px]">
      <div className="space-y-8">
        <div className="rounded-3xl bg-white  shadow-xl shadow-slate-200/40">
          <AddressSelector
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onAddAddress={() => setShowAddressForm(true)}
          />
        </div>

        {showAddressForm && (
          <AddressModal
            onClose={() => setShowAddressForm(false)}
            title="Add Address"
          >
            <AddressForm
              onSubmit={handleAddressCreate}
              isPending={isCreating}
              buttonText="Add"
              onSuccess={() => setShowAddressForm(false)}
            />
          </AddressModal>
        )}

        <div className="rounded-3xl bg-white  shadow-xl shadow-slate-200/40">
          <PaymentSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
      </div>

      <div className="sticky top-6 h-fit rounded-3xl bg-white  shadow-2xl shadow-blue-100/50">
        <OrderSummary
          cart={cart}
          onPlaceOrder={handlePlaceOrder}
          isPending={codPending || razorpayPending}
        />
      </div>
    </div>
  </div>
</div>
  );
}
export default CheckoutPage;
