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
      imageUrl: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Product Name"
        register={register("name")}
        error={errors.name}
      />

      <Textarea
        id="description"
        label="Description"
        register={register("description")}
        error={errors.description}
      />

      <Input
        type="number"
        label="Price"
        register={register("price")}
        error={errors.price}
      />

      <Input
        type="number"
        label="Stock"
        register={register("stock")}
        error={errors.stock}
      />

      <Input
        label="Image URL"
        register={register("imageUrl")}
        error={errors.imageUrl}
      />

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

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : buttonText}
      </Button>
    </form>
  );
}

export default ProductForm;
