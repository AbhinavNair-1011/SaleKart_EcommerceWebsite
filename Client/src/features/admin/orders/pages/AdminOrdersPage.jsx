import { useState } from "react";
import Loader from "../../../../shared/components/Loader";

import AdminOrderTable from "../components/AdminOrderTable";

import useAllOrders from "../hooks/useAllOrders";
import { useEffect } from "react";
import EmptyState from "../../../../shared/components/EmptyState";

function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useAllOrders({
    search: debouncedSearch,
    page,
    limit: 8,
  });

  const pagination = data?.data?.pagination;

  if (isLoading) {
    return <Loader />;
  }

  const orders = data?.data?.orders ?? [];

  return (
 <div className="w-full space-y-6 md:space-y-10">

  <section className="w-full overflow-hidden rounded-2xl bg-white shadow-sm">
    <div className="flex w-full flex-col gap-6 p-4 sm:p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between">

      <div className="min-w-0 flex-1">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-700 sm:text-xs">
          Order Management
        </span>


        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
          Orders
        </h1>


        <p className="mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
          View customer orders, monitor payment status, and manage order
          fulfillment.
        </p>


        <div className="mt-4 w-full">
          <input
            placeholder="Search order by user email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full min-w-0 rounded-xl bg-white px-4 py-3 text-sm outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>


      <div className="w-full rounded-2xl bg-slate-50 px-4 py-5 text-center sm:w-auto sm:px-8 sm:py-6">
        <p className="text-sm text-slate-500">
          Total Orders
        </p>

        <h2 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
          {orders.length}
        </h2>
      </div>

    </div>
  </section>



  {orders.length ? (
    <AdminOrderTable orders={orders} />
  ) : (
    <EmptyState title="No Orders Found" />
  )}



  <div className="mt-8 flex w-full items-center justify-center gap-2 sm:gap-5">

    <button
      disabled={page === 1}
      onClick={() => setPage((prev) => prev - 1)}
      className="rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-sm disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:py-2.5"
    >
      Previous
    </button>


    <div className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white sm:px-6 sm:py-2.5 sm:text-sm">
      {pagination.page} of {pagination.totalPages}
    </div>


    <button
      disabled={page === pagination.totalPages}
      onClick={() => setPage((prev) => prev + 1)}
      className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:bg-slate-400 sm:px-5 sm:py-2.5"
    >
      Next
    </button>

  </div>

</div>
  );
}

export default AdminOrdersPage;
