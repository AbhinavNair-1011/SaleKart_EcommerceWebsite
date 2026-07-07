import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Button from "../../../../shared/components/Button";
import Loader from "../../../../shared/components/Loader";

import ProductModal from "../components/ProductModal";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

import useProducts from "../hooks/useProducts";
import useCreateProduct from "../hooks/useCreateProduct";
import useUpdateProduct from "../hooks/useUpdateProduct";
import useDeleteProduct from "../hooks/useDeleteProduct";

import useCategories from "../../categories/hooks/useCategories";
import { useEffect } from "react";
import EmptyState from "../../../../shared/components/EmptyState";

function AdminProductPage() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useProducts({
    search: debouncedSearch,
    page,
    categoryId,
    limit: 8,
  });

  console.log(data);
  const { data: categoryData } = useCategories();

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();

  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const { mutate: deleteProduct } = useDeleteProduct();

  if (isLoading) return <Loader />;

  const products = data?.data?.products ?? [];
  const pagination = data?.data?.pagination;

  const categories = categoryData?.data?.categories ?? [];

  function handleCreate(formData) {
    console.log(formData);
    createProduct(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });

        toast.success("Product created.");

        setOpen(false);
      },
    });
  }

  function handleUpdate(formData) {
    updateProduct(
      {
        id: editingProduct.id,
        data: formData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });

          toast.success("Product updated.");

          setEditingProduct(null);

          setOpen(false);
        },
      },
    );
  }

  function handleDelete(product) {
    if (!confirm("Delete this product?")) return;

    deleteProduct(product.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });

        toast.success("Product deleted.");
      },
    });
  }

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Product Management
            </span>

            <h1 className="mt-4 text-4xl font-bold text-slate-900">Products</h1>

            <p className="mt-3 text-slate-500">
              Create, update and manage your store's products from one place.
            </p>
            <div className="relative flex-1">
              <input
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-xl bg-white py-3 pl-12 pr-4 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setPage(1);
              }}
              className="rounded-xl bg-white px-2 py-1 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-slate-400 lg:w-36 mt-1"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-slate-50 px-8 py-6 text-center">
              <p className="text-sm text-slate-500">Total Products</p>

              <h2 className="mt-1 text-4xl font-bold text-slate-900">
                {pagination.totalProducts}
              </h2>
            </div>

            <Button
              className="bg-slate-900 hover:bg-slate-800"
              onClick={() => {
                setEditingProduct(null);
                setOpen(true);
              }}
            >
              + Add Product
            </Button>
          </div>
        </div>
      </section>


{products.length ?

      (<ProductTable
        products={products}
        onEdit={(product) => {
          setEditingProduct({
            ...product,
            categoryId: product.Category.id,
          });

          setOpen(true);
        }}
        onDelete={handleDelete}
      />)
  : ( <EmptyState title="No Products Found" description={`Please add few Products `}
  />)}

      {open && (
        <ProductModal onClose={() => setOpen(false)}>
          <ProductForm
            defaultValues={editingProduct}
            categories={categories}
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            isPending={isCreating || isUpdating}
            buttonText={editingProduct ? "Update Product" : "Create Product"}
          />
        </ProductModal>
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

export default AdminProductPage;
