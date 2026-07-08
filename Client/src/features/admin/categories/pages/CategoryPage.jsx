import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Button from "../../../../shared/components/Button";
import Loader from "../../../../shared/components/Loader";
import EmptyState from "../../../../shared/components/EmptyState";

import CategoryForm from "../components/CategoryForm";
import CategoryModal from "../components/CategoryModal";
import CategoryTable from "../components/CategoryTable";

import useCategories from "../hooks/useCategories";
import useCreateCategory from "../hooks/useCreateCategory";
import useUpdateCategory from "../hooks/useUpdateCategory";
import useDeleteCategory from "../hooks/useDeleteCategory";
import { useEffect } from "react";

function CategoryPage() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const { data, isLoading } = useCategories({
    search: debouncedSearch,
    page,
    limit: 8,
  });

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();

  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const { mutate: deleteCategory } = useDeleteCategory();

  if (isLoading) return <Loader />;

  const categories = data?.data?.categories ?? [];
  const pagination = data?.data?.pagination;

  function handleCreate(data) {
    createCategory(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });

        setOpen(false);
      },
    });
  }

  function handleUpdate(data) {
    updateCategory(
      {
        id: editingCategory.id,
        data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["categories"],
          });

          setEditingCategory(null);

          setOpen(false);
        },
      },
    );
  }

  function handleDelete(category) {
    if (!confirm("Delete this category?")) return;

    deleteCategory(category.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });
      },
    });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10  ">
  <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
    <div className="flex flex-col gap-8 p-5 md:p-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-2xl">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
          Category Management
        </span>

        <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
          Categories
        </h1>

        <p className="mt-3 text-sm text-gray-500 md:text-base">
          Organize your products by creating and managing categories.
        </p>

        <div className="relative mt-4 w-full">
          <input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl bg-white py-3 pl-4 pr-4 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-slate-400 md:pl-12"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="rounded-2xl bg-slate-50 px-5 py-5 text-center md:px-8 md:py-6">
          <p className="text-sm text-gray-500">
            Total Categories
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
            {pagination.totalCategories}
          </h2>
        </div>

        <Button
          className="w-full bg-slate-900 hover:bg-slate-800 sm:w-auto"
          onClick={() => {
            setEditingCategory(null);
            setOpen(true);
          }}
        >
          + Add Category
        </Button>
      </div>
    </div>
  </section>

  {categories.length === 0 ? (
    <EmptyState title="No Categories Found" />
  ) : (
    <CategoryTable
      categories={categories}
      onEdit={(category) => {
        setEditingCategory(category);
        setOpen(true);
      }}
      onDelete={handleDelete}
    />
  )}

  {open && (
    <CategoryModal
      title={editingCategory ? "Edit Category" : "Add Category"}
      onClose={() => setOpen(false)}
    >
      <CategoryForm
        defaultValues={
          editingCategory ?? {
            name: "",
          }
        }
        onSubmit={editingCategory ? handleUpdate : handleCreate}
        isPending={isCreating || isUpdating}
        buttonText={
          editingCategory
            ? "Update Category"
            : "Create Category"
        }
      />
    </CategoryModal>
  )}

  <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-5">
    <button
      disabled={page === 1}
      onClick={() => setPage((prev) => prev - 1)}
      className="rounded-lg bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 md:px-5 md:py-2.5"
    >
      Previous
    </button>

    <div className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white md:px-6 md:py-2.5">
      {pagination.page} of {pagination.totalPages}
    </div>

    <button
      disabled={page === pagination.totalPages}
      onClick={() => setPage((prev) => prev + 1)}
      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 md:px-5 md:py-2.5"
    >
      Next
    </button>
  </div>
</div>
  );
}

export default CategoryPage;
