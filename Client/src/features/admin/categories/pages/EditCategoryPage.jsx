import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import CategoryForm from "../components/CategoryForm";
import { updateCategorySchema } from "../schemas/categorySchema";

import useCategory from "../hooks/useCategory";
import useUpdateCategory from "../hooks/useUpdateCategory";

function EditCategoryPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useCategory(id);

  const { mutate, isPending } = useUpdateCategory();

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  function handleSubmit(formData) {
    mutate(
      {
        id,
        data: formData,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);

          queryClient.invalidateQueries({
            queryKey: ["categories"],
          });

          queryClient.invalidateQueries({
            queryKey: ["category", id],
          });

          navigate("/admin/categories");
        },

        onError: (error) => {
          toast.error(error.response?.data?.message || "Something went wrong");
        },
      }
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit Category
        </h1>

        <p className="mt-2 text-gray-500">
          Update category information.
        </p>
      </div>

      <CategoryForm
        schema={updateCategorySchema}
        defaultValues={{
          name: data.data.name,
        }}
        onSubmit={handleSubmit}
        isPending={isPending}
        submitButtonText="Update Category"
      />
    </div>
  );
}

export default EditCategoryPage;