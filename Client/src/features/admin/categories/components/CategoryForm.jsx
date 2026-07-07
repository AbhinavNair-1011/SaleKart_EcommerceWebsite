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
  className="space-y-6"
>
  <div>
    <Input
      label="Category Name"
      placeholder="e.g. Electronics, Fashion, Books"
      error={errors.name?.message}
      {...register("name")}
    />

    <p className="mt-2 text-sm text-slate-500">
      Choose a clear and unique name for this category.
    </p>
  </div>

  <div className="flex justify-end border-t border-slate-100 pt-5">
    <Button
      type="submit"
      disabled={isPending}
      className="min-w-[180px] bg-slate-900 hover:bg-slate-800"
    >
      {isPending ? "Saving..." : buttonText}
    </Button>
  </div>
</form>
  );
}

export default CategoryForm;