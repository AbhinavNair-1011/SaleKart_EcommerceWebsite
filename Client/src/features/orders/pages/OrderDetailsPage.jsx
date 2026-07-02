import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../shared/components/Loader";

import OrderItem from "../components/OrderItem";

import useOrder from "../hooks/useOrder";
import Button from "../../../shared/components/Button";
import useCancelOrder from "../hooks/useCancelOrder";
import { useQueryClient } from "@tanstack/react-query";

function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useCancelOrder();
  const { data, isLoading } = useOrder(id);

  if (isLoading) {
    return <Loader />;
  }

  const order = data?.data?.order;

  function handleCancelOrder() {
    mutate(order.id, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });

        queryClient.invalidateQueries({
          queryKey: ["orders", order.id],
        });

        toast.success("Order cancelled.");

        navigate("/orders");
      },

      onError(error) {
        toast.error(
          error.response?.data?.error?.message ?? "Something went wrong.",
        );
      },
    });
  }
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Button className="w-fit" onClick={() => navigate(-1)}>
        {`<`} Back
      </Button>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold">Order Details</h1>

        <div className="space-y-2">
          <p>
            <strong>Order Status:</strong> {order.orderStatus}
          </p>
          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>
          <p>
            <strong>Subtotal:</strong> ₹{order.subtotal}
          </p>
          <p>
            <strong>Delivery:</strong> ₹{order.deliveryCharge}
          </p>
          <p className="text-lg font-bold">Total : ₹{order.totalAmount}</p>
        </div>
        {order.orderStatus === "pending" && (
          <Button
            className="bg-red-600 hover:bg-red-700 mt-2"
            disabled={isPending}
            onClick={handleCancelOrder}
          >
            {isPending ? "Cancelling..." : "Cancel Order"}
          </Button>
        )}
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Shipping Address</h2>

        <p>{order.Address.fullName}</p>
        <p>{order.Address.phone}</p>
        <p>{order.Address.addressLine}</p>
        <p>
          {order.Address.city}, {order.Address.state}
        </p>
        <p>{order.Address.postalCode}</p>

        <p>{order.Address.country}</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Ordered Items</h2>

        <div className="space-y-4">
          {order.OrderItems.map((item) => (
            <OrderItem key={item.productName} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
