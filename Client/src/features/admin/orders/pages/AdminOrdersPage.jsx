import Loader from "../../../../shared/components/Loader";

import AdminOrderTable from "../components/AdminOrderTable";

import useAllOrders from "../hooks/useAllOrders";

function AdminOrdersPage() {
  const { data, isLoading } = useAllOrders();

  if (isLoading) {
    return <Loader />;
  }

  const orders = data?.data?.orders ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      <AdminOrderTable orders={orders} />
    </div>
  );
}

export default AdminOrdersPage;
