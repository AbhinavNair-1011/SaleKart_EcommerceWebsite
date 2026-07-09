import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input";
import Textarea from "../../../../shared/components/TextArea";
import productSchema from "../schemas/productSchema";
import Select from "../../../../shared/components/Select";

function ProductForm({
  defaultValues,
  categories,
  onSubmit,
  isPending,
  buttonText,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      image: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        description: defaultValues.description,
        price: defaultValues.price,
        stock: defaultValues.stock,
        categoryId: defaultValues.categoryId,
      });
    }
  }, [defaultValues, reset]);

  function handleFormSubmit(data) {
    const formData = new FormData();

    formData.append("name", data.name);

    formData.append("description", data.description);

    formData.append("price", data.price);

    formData.append("stock", data.stock);

    formData.append("categoryId", data.categoryId);

    if (data.image?.length > 0) {
      formData.append("image", data.image[0]);
    }

    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5 md:space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
          Product Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Fill in the details below to create or update a product.
        </p>
      </div>

      <Input
        label="Product Name"
        placeholder="e.g. Wireless Mouse"
        register={register("name")}
        error={errors.name}
      />

      <Textarea
        id="description"
        label="Description"
        register={register("description")}
        error={errors.description}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          type="number"
          label="Price"
          placeholder="0.00"
          register={register("price")}
          error={errors.price}
        />

        <Input
          type="number"
          label="Stock"
          placeholder="0"
          register={register("stock")}
          error={errors.stock}
        />
      </div>

      {defaultValues?.imageUrl && (
        <div>
          <p className="mb-2 text-sm font-medium">Current Image</p>

          <img
            src={defaultValues.imageUrl}
            alt={defaultValues.name}
            className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32"
          />
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="min-w-0">
          <label className="mb-2 block text-sm font-medium">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full rounded-lg border p-2 text-sm file:max-w-full"
          />

          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
          )}
        </div>

        <Select
          id="categoryId"
          label="Category"
          register={register("categoryId")}
          error={errors.categoryId}
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex border-t border-slate-100 pt-5 sm:justify-end">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-slate-900 hover:bg-slate-800 sm:w-auto sm:min-w-45"
        >
          {isPending ? "Saving..." : buttonText}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
