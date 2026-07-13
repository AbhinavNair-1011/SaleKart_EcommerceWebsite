import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { loginSchema } from "../schemas/loginSchema";
import { useLogin } from "../hooks/useLogin";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

function LoginForm() {
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(formData) {
    mutate(formData, {
      onSuccess: (user) => {
        queryClient.setQueryData(["me"], user);

        toast.success("Login successful.");

        if (user.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      },

      onError: (error) => {
        const err = error.response.data;
        if (err.error.name === "emailVerify" && err.statusCode === 403) {
          sessionStorage.setItem(
            "registrationEmail",
            JSON.stringify(formData.email),
          );

          navigate("/verify-email");
        }
        toast.error(
          error.response?.data?.error?.message || "Something went wrong.",
        );
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-1 flex flex-col"
    >
      <Input
        id="email"
        label="Email"
        type="email"
        register={register("email")}
        error={errors.email}
        placeholder="you@example.com"
      />

      <Input
        id="password"
        label="Password"
        type="password"
        register={register("password")}
        error={errors.password}
        placeholder="Password"

      />
      <p className="text-right">
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-blue-900 font-bold underline"
        >
          Forgot Password?
        </button>
      </p>
      <Button type="submit" disabled={isPending} className={""}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;
