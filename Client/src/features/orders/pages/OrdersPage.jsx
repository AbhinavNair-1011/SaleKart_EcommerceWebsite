import EmptyState from "../../../shared/components/EmptyState";
import Loader from "../../../shared/components/Loader";

import OrderCard from "../components/OrderCard";

import useOrders from "../hooks/useOrders";

function OrdersPage() {
  const { data, isLoading } = useOrders();

  if (isLoading) {
    return <Loader />;
  }

  const orders = data?.data?.orders ?? [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
  <div className="mb-8">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
      Orders
    </p>

    <p className="mt-2 text-gray-500">
      Track your purchases and view your previous orders.
    </p>
  </div>

  {orders.length === 0 ? (
    <div className="rounded-3xl bg-white p-12 text-center shadow-xl shadow-slate-200/40">
      <EmptyState title="No orders found" />
    </div>
  ) : (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )}
</div>
  );
}

export default OrdersPage;
