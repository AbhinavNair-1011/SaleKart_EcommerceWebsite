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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <Input
        id="landmark"
        label="Landmark"
        register={register("landmark")}
        error={errors.landmark}
      />

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

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Saving..." : buttonText}
      </Button>
    </form>
  );
}

export default AddressForm;
