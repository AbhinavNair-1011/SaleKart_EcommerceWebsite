import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

import { forgotPasswordSchema } from "../schemas/loginSchema";

import useForgotPassword from "../hooks/useForgotPassword";

function ForgotPasswordForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      forgotPasswordSchema,
    ),
  });

  const {
    mutate,
    isPending,
  } = useForgotPassword();

  function onSubmit(data) {
    mutate(data, {
      onSuccess(response) {
        toast.success(
          "OTP sent successfully.",
        );

        navigate(
          `/reset-password?email=${response.data.email}`,
        );
      },

      onError(error) {
        toast.error(
          error.response?.data?.error
            ?.message ??
            "Something went wrong.",
        );
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        id="email"
        label="Email"
        type="email"
        register={register("email")}
        error={errors.email}
      />

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Sending..."
          : "Send OTP"}
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;