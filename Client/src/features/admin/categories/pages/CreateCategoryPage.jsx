import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import CategoryForm from "../components/CategoryForm";
import { createCategorySchema } from "../schemas/categorySchema";
import useCreateCategory from "../hooks/useCreateCategory";

function CreateCategoryPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateCategory();

  function handleSubmit(data) {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });

        navigate("/admin/categories");
      },

      onError: (error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      },
    });
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Create Category
        </h1>

        <p className="mt-2 text-gray-500">
          Add a new category to your store.
        </p>
      </div>

      <CategoryForm
        schema={createCategorySchema}
        defaultValues={{
          name: "",
        }}
        onSubmit={handleSubmit}
        isPending={isPending}
        submitButtonText="Create Category"
      />
    </div>
  );
}

export default CreateCategoryPage;