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
    <div className="space-y-10">
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Admin Dashboard
            </span>

            <h1 className="mt-4 text-4xl font-bold text-gray-900">Dashboard</h1>

            <p className="mt-3 text-gray-500">
              Monitor your store's performance, manage inventory, and track
              orders from one place.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-8 py-6 text-center">
            <p className="text-sm text-gray-500">Total Revenue</p>

            <h2 className="mt-1 text-4xl font-bold text-slate-900">
              ₹{dashboard.revenue}
            </h2>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Store Overview
          </h2>

          <p className="mt-1 text-gray-500">
            A quick summary of your store statistics.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          <DashboardCard title="Users" value={dashboard.totalUsers} />

          <DashboardCard title="Products" value={dashboard.totalProducts} />

          <DashboardCard title="Categories" value={dashboard.totalCategories} />

          <DashboardCard title="Orders" value={dashboard.totalOrders} />

          <DashboardCard title="Revenue" value={`₹${dashboard.revenue}`} />
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
