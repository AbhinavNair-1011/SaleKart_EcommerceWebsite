import { Navigate, useSearchParams } from "react-router-dom";

import VerifyEmailForm from "../components/VerifyEmailForm";
import AuthCard from "../components/AuthCard";

function VerifyEmailPage() {
  return (
    <AuthCard>
      <VerifyEmailForm />
    </AuthCard>
  );
}

export default VerifyEmailPage;
