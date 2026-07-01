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
    limit: 12,
  });

  const { data: categoryData } = useCategories();

  const categories = categoryData?.data?.categories ?? [];

  if (isLoading) {
    return <Loader />;
  }

  const products = data?.data?.products ?? [];

  const pagination = data?.data?.pagination;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      <div className="flex gap-4">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 rounded-lg border p-3"
        />
      </div>

      <select
        value={categoryId}
        onChange={(e) => {
          setCategoryId(e.target.value);
          setPage(1);
        }}
        className="rounded-lg border p-3"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {products.length === 0 ? (
        <EmptyState
          title={`No Products by the name of ${debouncedSearch}`}
          description={` Kindly search for the desired product again with the correct name`}
        />
      ) : (
        <ProductList products={products} />
      )}

      <div className="flex justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded border px-4 py-2"
        >
          Previous
        </button>

        <span className="flex items-center">
          {pagination.page} / {pagination.totalPages}
        </span>

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded border px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
