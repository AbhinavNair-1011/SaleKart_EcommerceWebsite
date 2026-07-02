import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import addressSchema from "../schemas/addressSchema";

import Input from "../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import Button from "../../../shared/components/Button";

function AddressForm({ defaultValues, onSubmit, isPending, buttonText }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),

    defaultValues: {
      houseNumber: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      addressType: "home",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  <div>
    <h2 className="text-xl font-semibold text-slate-900">
      Address Details
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Enter your delivery address information.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-2">
    <Input
      id="houseNumber"
      label="House / Flat No"
      register={register("houseNumber")}
      error={errors.houseNumber}
    />

    <Input
      id="area"
      label="Area / Street"
      register={register("area")}
      error={errors.area}
    />
  </div>

  <Input
    id="landmark"
    label="Landmark (Optional)"
    register={register("landmark")}
    error={errors.landmark}
  />

  <div className="grid gap-4 md:grid-cols-2">
    <Input
      id="city"
      label="City"
      register={register("city")}
      error={errors.city}
    />

    <Input
      id="state"
      label="State"
      register={register("state")}
      error={errors.state}
    />
  </div>

  <div className="grid gap-4 md:grid-cols-[1fr_180px]">
    <Input
      id="pincode"
      label="Pincode"
      register={register("pincode")}
      error={errors.pincode}
    />

    <Select
      id="addressType"
      label="Address Type"
      register={register("addressType")}
      error={errors.addressType}
    >
      <option value="home">Home</option>
      <option value="work">Work</option>
      <option value="other">Other</option>
    </Select>
  </div>

  <div className="flex justify-end border-t border-slate-100 pt-5">
    <Button
      type="submit"
      disabled={isPending}
      className="min-w-[170px] bg-slate-900 hover:bg-slate-800"
    >
      {isPending ? "Saving..." : buttonText}
    </Button>
  </div>
</form>
  );
}

export default AddressForm;
