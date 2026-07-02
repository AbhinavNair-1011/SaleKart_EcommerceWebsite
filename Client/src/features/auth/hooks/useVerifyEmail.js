import { useMutation } from "@tanstack/react-query";

import { verifyEmail } from "../api/authApi";

function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}

export default useVerifyEmail;