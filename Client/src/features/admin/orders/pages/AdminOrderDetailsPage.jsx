import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Loader from "../../../../shared/components/Loader";
import Button from "../../../../shared/components/Button";

import OrderItem from "../../../orders/components/OrderItem";

import useAdminOrder from "../hooks/useAdminOrder";
import useUpdateOrderStatus from "../hooks/userUpdateOrderStatus";
import OrderStatusBadge from "../components/OrderStatusBadge";

function AdminOrderDetailsPage() {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data, isLoading } = useAdminOrder(id);

  const { mutate: updateOrderStatus, isPending } = useUpdateOrderStatus();
  const [status, setStatus] = useState("");

    const order = data?.data?.order;

  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus);
    }
  }, [order]);

 

  function handleUpdate() {
    updateOrderStatus(
      {
        id: order.id,
        orderStatus: status,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: ["admin-order", id],
          });

          queryClient.invalidateQueries({
            queryKey: ["admin-orders"],
          });

          toast.success("Order updated.");
        },

        onError(error) {
          toast.error(
            error.response?.data?.error?.message ?? "Something went wrong.",
          );
        },
      },
    );
  }

   if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
  <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
    <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
          Order Management
        </span>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          Order Details
        </h1>

        <p className="mt-2 text-slate-500">
          Review customer information, purchased products and update the order
          status.
        </p>
      </div>

      <OrderStatusBadge status={order.orderStatus} />
    </div>
  </section>

  <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
    <div className="space-y-8">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          Customer Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">
              Customer
            </p>

            <p className="mt-1 font-medium">
              {order.User.name}
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Email
            </p>

            <p className="mt-1">
              {order.User.email}
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Phone
            </p>

            <p className="mt-1">
              {order.User.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Payment Method
            </p>

            <p className="mt-1 capitalize">
              {order.paymentMethod}
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Payment Status
            </p>

            <p className="mt-1 capitalize">
              {order.paymentStatus}
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Total Amount
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {order.totalAmount}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">
          Shipping Address
        </h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
          {order.Address.addressType}
        </span>

        <div className="mt-4 space-y-2 text-slate-700">
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
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">
          Ordered Products
        </h2>

        <div className="space-y-4">
          {order.OrderItems.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </section>
    </div>

    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">
          Update Status
        </h2>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <Button
          className="mt-5 w-full bg-slate-900 hover:bg-slate-800"
          onClick={handleUpdate}
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </aside>
  </div>
</div>
  );
}

export default AdminOrderDetailsPage;
