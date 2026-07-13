import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";

import { resetPasswordSchema } from "../schemas/loginSchema";

import useResetPassword from "../hooks/useResetPassword";
import useForgotPassword from "../hooks/useForgotPassword";

function ResetPasswordForm({ email }) {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending } = useResetPassword();

  const { mutate: resendOtp, isPending: isResending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      email,
      otp: "",
      password: "",
    },
  });

  function onSubmit(data) {
    resetPassword(data, {
      onSuccess() {
        toast.success("Password reset successful.");

        navigate("/login");
      },

      onError(error) {
        toast.error(
          error.response?.data?.error?.message ?? "Something went wrong.",
        );
      },
    });
  }

  function handleResendOtp() {
    resendOtp(
      { email },
      {
        onSuccess() {
          toast.success("OTP sent successfully.");
        },

        onError(error) {
          toast.error(
            error.response?.data?.error?.message ?? "Unable to resend OTP.",
          );
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" autoComplete="off">
      <p className="text-center text-sm text-green-600">
        OTP sent to
        <br />
        <strong>{email}</strong>
      </p>

      <Input
        id="otp"
        type={"number"}
        label="OTP"
        register={register("otp")}
        error={errors.otp?.message}
                placeholder={"Enter Otp Recieved"}

      />

      <Input
        id="password"
        label="New Password"
        type="password"
        register={register("password")}
        error={errors.password?.message}
        
        placeholder={"Enter New Passwrod"}
      />

      <div className="flex justify-evenly">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>

        <Button type="button" disabled={isResending} onClick={handleResendOtp}>
          {isResending ? "Sending..." : "Resend OTP"}
        </Button>
      </div>
              <button className="underline cursor-pointer w-full text-blue-900 " onClick={()=>{navigate("/login")}}> back to login </button>

    </form>
    
  );
}

export default ResetPasswordForm;
