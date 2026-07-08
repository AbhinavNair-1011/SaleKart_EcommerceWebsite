import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../shared/components/Loader";

import OrderItem from "../components/OrderItem";

import useOrder from "../hooks/useOrder";
import Button from "../../../shared/components/Button";
import useCancelOrder from "../hooks/useCancelOrder";
import { useQueryClient } from "@tanstack/react-query";
import OrderStatusBadge from "../components/OrderStatusBadge";

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
<div className="mx-auto max-w-[90%] py-8">
  <div className="mb-8 flex items-center justify-between">
    <div>
      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
        Order Details
      </span>

      <h1 className="mt-4 text-lg md:text-2xl font-bold text-gray-900">
        Order #{order.id}
      </h1>

      <p className="mt-2 text-gray-500">
        View your order details, shipping information and purchased items.
      </p>
    </div>

    <Button
      className="bg-slate-700 hover:bg-slate-800 "
      onClick={() => navigate(-1)}
    >
       Back
    </Button>
  </div>

  <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
    <div className="space-y-8">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Order Information
          </h2>

          <OrderStatusBadge status={order.orderStatus} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">
              Payment Method
            </p>

            <p className="mt-1 font-medium capitalize">
              {order.paymentMethod}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Payment Status
            </p>

            <p className="mt-1 font-medium capitalize">
              {order.paymentStatus}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Subtotal
            </p>

            <p className="mt-1 font-medium">
              {order.subtotal}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Delivery
            </p>

            <p className="mt-1 font-medium">
              {order.deliveryCharge}
            </p>
          </div>
        </div>

        {order.orderStatus === "pending" && (
          <Button
            className="mt-6 bg-red-600 hover:bg-red-700"
            disabled={isPending}
            onClick={handleCancelOrder}
          >
            {isPending ? "Cancelling..." : "Cancel Order"}
          </Button>
        )}
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">
          Ordered Items
        </h2>

        <div className="space-y-4">
          {order.OrderItems.map((item) => (
            <OrderItem
              key={item.productName}
              item={item}
            />
          ))}
        </div>
      </section>
    </div>

    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">
          Shipping Address
        </h2>

        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase text-white">
          {order.Address.addressType}
        </span>

        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            {order.Address.houseNumber}, {order.Address.area}
          </p>

          {order.Address.landmark && (
            <p>
              Landmark: {order.Address.landmark}
            </p>
          )}

          <p>
            {order.Address.city}, {order.Address.state}
          </p>

          <p>{order.Address.pincode}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-600 p-6 text-white">
        <p className="text-sm text-slate-300">
          Total Amount
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {order.totalAmount}
        </h2>
      </div>
    </aside>
  </div>
</div>
  );
}

export default OrderDetailsPage;
