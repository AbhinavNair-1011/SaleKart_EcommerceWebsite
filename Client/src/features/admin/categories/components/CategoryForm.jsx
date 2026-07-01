import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input";

import categorySchema from "../schemas/categorySchema";

function CategoryForm({
  defaultValues,
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
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Input
        label="Category Name"
        placeholder="Enter category name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "Saving..." : buttonText}
      </Button>
    </form>
  );
}

export default CategoryForm;