import { useMutation } from "@tanstack/react-query";

import { resendVerificationOtp } from "../api/authApi";

function useResendVerificationOtp() {
  return useMutation({
    mutationFn: resendVerificationOtp,
  });
}

export default useResendVerificationOtp;