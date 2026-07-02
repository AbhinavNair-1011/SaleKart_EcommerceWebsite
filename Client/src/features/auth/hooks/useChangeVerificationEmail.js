import { useMutation } from "@tanstack/react-query";

import { changeVerificationEmail } from "../api/authApi";

function useChangeVerificationEmail() {
  return useMutation({
    mutationFn: changeVerificationEmail,
  });
}

export default useChangeVerificationEmail;
