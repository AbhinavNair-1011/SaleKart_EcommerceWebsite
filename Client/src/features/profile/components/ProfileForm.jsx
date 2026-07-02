import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

import profileSchema from "../schemas/profileSchema";
import useUpdateProfile from "../hooks/useUpdateProfile";

function ProfileForm({ user }) {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      name: "",
      userName: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        userName: user.userName,
        phone: user.phone,
      });
    }
  }, [user, reset]);

  function onSubmit(data) {
    console.log(data)
    updateProfile(data, {
      onSuccess(updatedUser) {
        queryClient.setQueryData(["me"], updatedUser);

        toast.success("Profile updated successfully.");
      },

      onError(error) {
        toast.error(
          error.response?.data?.error?.message ?? "Something went wrong.",
        );
      },
    });
  }

  return (
    <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-5"
>
  <Input
    id="name"
    label="Full Name"
    register={register("name")}
    error={errors.name}
  />

  <Input
    id="phone"
    label="Phone Number"
    register={register("phone")}
    error={errors.phone}
  />

  <Input
    label="Email"
    value={user?.email}
    disabled
    className="cursor-not-allowed bg-gray-100"
  />

  <Input
    id="userName"
    label="Username"
    register={register("userName")}
    error={errors.userName}
  />

  <div className="flex justify-end pt-2">
    <Button
      type="submit"
      disabled={isPending}
      className="bg-slate-600 hover:bg-slate-700 min-w-40"
    >
      {isPending ? "Saving..." : "Update Profile"}
    </Button>
  </div>
</form>
  );
}

export default ProfileForm;
