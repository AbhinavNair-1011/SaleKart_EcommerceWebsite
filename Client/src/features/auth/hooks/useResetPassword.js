import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "../api/authApi";

function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}

export default useResetPassword;
