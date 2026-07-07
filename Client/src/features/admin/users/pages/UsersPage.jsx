import { useState } from "react";
import Loader from "../../../../shared/components/Loader";

import UserTable from "../components/UserTable";

import useUsers from "../hooks/useUsers";
import { useEffect } from "react";
import EmptyState from "../../../../shared/components/EmptyState";

function UsersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useUsers({
    search:debouncedSearch,
    page,
    limit: 8,
  });

  const pagination = data?.data?.pagination;

  if (isLoading) {
    return <Loader />;
  }

  const users = data?.data?.users ?? [];

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              User Management
            </span>

            <h1 className="mt-4 text-4xl font-bold text-slate-900">Users</h1>

            <p className="mt-3 text-slate-500">
              View and manage registered users, monitor customer activity, and
              keep your store organized.
            </p>
            <div className="relative flex-1">
              <input
                placeholder="Search by user email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-xl bg-white py-3 pl-12 pr-4 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 px-8 py-6 text-center">
            <p className="text-sm text-slate-500">Total Users</p>

            <h2 className="mt-1 text-4xl font-bold text-slate-900">
              {users.length}
            </h2>
          </div>
        </div>
      </section>



      {users.length ? (
        <UserTable users={users} />
      ) : (
        <EmptyState
          title="No users Found"
     
        />
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

export default UsersPage;
