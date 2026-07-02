import { Link } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <AuthCard title="Create your account">
      <RegisterForm />

      <p className="mt-6 text-center text-sm text-white">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-white underline">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}

export default RegisterPage;
