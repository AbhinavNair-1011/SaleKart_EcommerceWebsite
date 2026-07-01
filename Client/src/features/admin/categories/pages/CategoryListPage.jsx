import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import CategoryTable from "../components/CategoryTable";

import useCategories from "../hooks/useCategories";
import useDeleteCategory from "../hooks/useDeleteCategory";

function CategoryListPage() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useCategories();

  const {
    mutate,
    isPending,
  } = useDeleteCategory();

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    mutate(id, {
      onSuccess: (response) => {
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });
      },

      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Something went wrong"
        );
      },
    });
  }

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          Loading categories...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg font-medium text-red-500">
          {error.response?.data?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Categories
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all product categories.
          </p>
        </div>

        <Link
          to="/admin/categories/create"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          + Create Category
        </Link>
      </div>

      <CategoryTable
        categories={data.data}
        onDelete={handleDelete}
        isDeleting={isPending}
      />
    </div>
  );
}

export default CategoryListPage;