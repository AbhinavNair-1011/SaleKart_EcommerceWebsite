import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

import useVerifyEmail from "../hooks/useVerifyEmail";
import useResendVerificationOtp from "../hooks/userResendVerificationOtp";

import useChangeVerificationEmail from "../hooks/useChangeVerificationEmail";
import { changeVerificationEmailSchema } from "../schemas/registerSchema";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

function VerifyEmailForm() {
  const navigate = useNavigate();
  const { mutate: verify, isPending } = useVerifyEmail();

  const { mutate: resend, isPending: isResending } = useResendVerificationOtp();
  const email = JSON.parse(sessionStorage.getItem("registrationEmail"));

  const [currentEmail, setCurrentEmail] = useState(email);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: zodResolver(changeVerificationEmailSchema),

    defaultValues: {
      newEmail: currentEmail,
    },
  });

  const { mutate: changeEmail, isPending: isChangingEmail } =
    useChangeVerificationEmail();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data) {
    verify(
      {
        email: currentEmail,
        otp: data.otp,
      },
      {
        onSuccess() {
          toast.success("Email verified successfully.");

          navigate("/login");
        },

        onError(error) {
          toast.error(
            error.response?.data?.error?.message ?? "Verification failed.",
          );
        },
      },
    );
  }

  function handleResend() {
    resend(
      {
        email: currentEmail,
      },
      {
        onSuccess() {
          toast.success("OTP sent.");
        },

        onError(error) {
          toast.error(
            error.response?.data?.error?.message ?? "Unable to resend OTP.",
          );
        },
      },
    );
  }
  function handleChangeEmail(data) {
    changeEmail(
      {
        oldEmail: currentEmail,

        newEmail: data.newEmail,
      },
      {
        onSuccess(response) {
          toast.success("OTP sent to new email.");

          setCurrentEmail(response.data.email);

          setShowChangeEmail(false);
        },

        onError(error) {
          toast.error(
            error.response?.data?.error?.message ?? "Unable to change email.",
          );
        },
      },
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-xl   p-6 shadow"
    >
      <h1 className="text-center text-2xl font-bold">Verify Email</h1>

      <p className="text-center text-sm text-green-500 ">
        OTP sent to
        <br />
        <strong>{currentEmail}</strong>
      </p>
      <button
        type="button"
        onClick={() => setShowChangeEmail((prev) => !prev)}
        className="text-sm white underline hover:underline"
      >
        {
          showChangeEmail ? "correct email?" :" Wrong email ? Change Email" 
        }
     
      </button>

      {showChangeEmail && (
        <div className="space-y-4 rounded-lg  p-4">
          <Input
            id="newEmail"
            label="New Email"
            register={registerEmail("newEmail")}
            error={emailErrors.newEmail?.message}
          />

          <Button
            type="button"
            onClick={handleSubmitEmail(handleChangeEmail)}
            disabled={isChangingEmail}
          >
            {isChangingEmail ? "Updating..." : "Update Email"}
          </Button>
        </div>
      )}
      <Input id="otp" label="OTP" register={register("otp")} />

      <div className="flex justify-evenly">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Verifying..." : "Verify"}
        </Button>

        <Button type="button" disabled={isResending} onClick={handleResend}>
          {isResending ? "Sending..." : "Resend OTP"}
        </Button>
      </div>
          

    </form>
  );
}

export default VerifyEmailForm;
