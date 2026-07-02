import Loader from "../../../../shared/components/Loader";

import DashboardCard from "../components/DashboardCard";

import useDashboard from "../hooks/useDashboard";

function AdminDashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <Loader />;
  }

  const dashboard = data?.data;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <DashboardCard title="Users" value={dashboard.totalUsers} />

        <DashboardCard title="Products" value={dashboard.totalProducts} />

        <DashboardCard title="Categories" value={dashboard.totalCategories} />

        <DashboardCard title="Orders" value={dashboard.totalOrders} />

        <DashboardCard title="Revenue" value={`₹${dashboard.revenue}`} />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
