import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";
import { useQueryClient } from "@tanstack/react-query";

function LoginPage() {
  const queryClient = useQueryClient();
  return (
    <AuthCard title="Welcome Back">
      <LoginForm />
      <p className="mt-6 text-center text-sm text-black">
        Create an account {"  "}
        <Link to="/register" className="font-bold text-blue-900 underline">
          register
        </Link>
      </p>
    </AuthCard>
  );
}

export default LoginPage;
