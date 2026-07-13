import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { registerSchema } from "../schemas/registerSchema";
import { useRegister } from "../hooks/useRegister";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

function RegisterForm() {
  const navigate = useNavigate();

  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(formData) {
    mutate(formData, {
      onSuccess(data) {
        sessionStorage.setItem("registrationEmail", JSON.stringify(data.email));

        toast.success("OTP sent to your email.");

        navigate(`/verify-email`);
      },

      onError: (error) => {
        toast.error(
          error.response?.data?.error?.message || "Something went wrong.",
        );
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
      <Input
        id="name"
        label="Full Name"
        register={register("name")}
        error={errors.name}
        placeholder="Name"
      />

      <Input
        id="userName"
        label="Username"
        register={register("userName")}
        error={errors.userName}
        placeholder="Username"
      />

      <Input
        id="email"
        type="email"
        label="Email"
        register={register("email")}
        error={errors.email}
        placeholder="you@gmail.com"
      />

      <Input
        id="password"
        type="password"
        label="Password"
        register={register("password")}
        error={errors.password}
        placeholder="Password"
      />

      <Input
        id="dob"
        type="date"
        label="Date of Birth"
        register={register("dob")}
        error={errors.dob}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}

export default RegisterForm;
