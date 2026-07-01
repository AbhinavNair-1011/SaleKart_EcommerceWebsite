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

function CategoryPage() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const { data, isLoading } = useCategories();

  const { mutate: createCategory, isPending: isCreating } =
    useCreateCategory();

  const { mutate: updateCategory, isPending: isUpdating } =
    useUpdateCategory();

  const { mutate: deleteCategory } =
    useDeleteCategory();

  if (isLoading) return <Loader />;

  const categories = data?.data?.categories ?? [];

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
      }
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
    <div className="mx-auto max-w-6xl space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <Button
          onClick={() => {
            setEditingCategory(null);
            setOpen(true);
          }}
        >
          + Add Category
        </Button>
      </div>

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
          title={
            editingCategory
              ? "Edit Category"
              : "Add Category"
          }
          onClose={() => setOpen(false)}
        >
          <CategoryForm
            defaultValues={
              editingCategory ?? {
                name: "",
              }
            }
            onSubmit={
              editingCategory
                ? handleUpdate
                : handleCreate
            }
            isPending={
              isCreating || isUpdating
            }
            buttonText={
              editingCategory
                ? "Update Category"
                : "Create Category"
            }
          />
        </CategoryModal>
      )}
    </div>
  );
}

export default CategoryPage;