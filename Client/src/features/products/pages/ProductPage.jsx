import { useEffect, useState } from "react";

import Loader from "../../../shared/components/Loader";

import ProductList from "../components/ProductList";

import useProducts from "../hooks/useProducts";
import useCategories from "../../admin/categories/hooks/useCategories";
import EmptyState from "../../../shared/components/EmptyState";
function ProductPage() {
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useProducts({
    search: debouncedSearch,
    categoryId,
    page,
    limit: 8,
  });

  const { data: categoryData } = useCategories();

  const categories = categoryData?.data?.categories ?? [];

  if (isLoading) {
    return <Loader />;
  }

  const products = data?.data?.products ?? [];

  const pagination = data?.data?.pagination;

  return (
    <div className="mx-auto max-w-[90%] py-10">
      <section className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/60">
        <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-700">
              Store Collection
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950">
              Explore Our Products
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-500">
              Browse premium products across multiple categories. Use the search
              and filters below to quickly find exactly what you're looking for.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-100 px-10 py-7 text-center shadow-inner">
            <p className="text-sm font-medium text-slate-500">
              Available Products
            </p>

            <h2 className="mt-2 text-5xl font-black text-slate-950">
              {pagination.totalProducts}
            </h2>
          </div>
        </div>

        <div className="bg-slate-50 px-8 py-7">
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                />
              </svg>

              <input
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-2xl bg-white py-4 pl-14 pr-5 text-sm shadow-sm outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setPage(1);
              }}
              className="rounded-2xl bg-white px-5 py-4 text-sm shadow-sm outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-indigo-400 lg:w-64"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mt-12 min-h-[500px]">
        {products.length === 0 ? (
          <EmptyState
            title="No Products Found"
            description="We couldn't find any products matching your search."
          />
        ) : (
          <ProductList products={products} />
        )}
      </section>

      <div className="mt-12 flex items-center justify-center gap-5">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded-xl bg-white px-6 py-3 font-semibold shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <div className="rounded-xl bg-slate-950 px-7 py-3 text-sm font-bold text-white shadow-md">
          {pagination.page} of {pagination.totalPages}
        </div>

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
