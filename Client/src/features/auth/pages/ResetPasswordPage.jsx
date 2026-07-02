import { Navigate, useSearchParams } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import ResetPasswordForm from "../components/ResetPasswordForm";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <AuthCard title="Reset Password">
      <ResetPasswordForm email={email} />
    </AuthCard>
  );
}

export default ResetPasswordPage;
