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
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
      <EmptyState title={`No orders found`} />
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
