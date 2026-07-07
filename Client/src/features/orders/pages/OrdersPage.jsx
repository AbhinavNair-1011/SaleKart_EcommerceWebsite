import { useState } from "react";
import EmptyState from "../../../shared/components/EmptyState";
import Loader from "../../../shared/components/Loader";

import OrderCard from "../components/OrderCard";

import useOrders from "../hooks/useOrders";

function OrdersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useOrders({
    page,
    limit: 8,
  });

  if (isLoading) {
    return <Loader />;
  }
  const pagination = data?.data?.pagination;

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
      <div className="mt-10 flex items-center justify-center gap-5">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded-lg bg-white px-5 py-2.5 font-medium shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <div className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white">
          {pagination.page} of {pagination.totalPages}
        </div>

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OrdersPage;
