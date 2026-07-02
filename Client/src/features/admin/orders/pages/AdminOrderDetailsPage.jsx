import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Loader from "../../../../shared/components/Loader";
import Button from "../../../../shared/components/Button";

import OrderItem from "../../../orders/components/OrderItem";

import useAdminOrder from "../hooks/useAdminOrder";
import useUpdateOrderStatus from "../hooks/userUpdateOrderStatus";

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
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-xl border bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">Order Details</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p>
              <strong>Customer:</strong> {order.User.name}
            </p>

            <p>
              <strong>Email:</strong> {order.User.email}
            </p>

            <p>
              <strong>Phone:</strong> {order.User.phone}
            </p>
          </div>

          <div>
            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>

            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Shipping Address</h2>

        <p>
          {order.Address.houseNumber}, {order.Address.area}
        </p>

        {order.Address.landmark && <p>{order.Address.landmark}</p>}

        <p>
          {order.Address.city}, {order.Address.state}
        </p>

        <p>{order.Address.pincode}</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Products</h2>

        <div className="space-y-4">
          {order.OrderItems.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">Update Status</h2>

        <div className="flex items-center gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border p-3"
          >
            <option value="pending">Pending</option>

            <option value="processing">Processing</option>

            <option value="shipped">Shipped</option>

            <option value="delivered">Delivered</option>

            <option value="cancelled">Cancelled</option>
          </select>

          <Button onClick={handleUpdate} disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetailsPage;
