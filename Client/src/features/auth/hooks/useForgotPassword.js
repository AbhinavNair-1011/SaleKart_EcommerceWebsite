import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "../api/authApi";

function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

export default useForgotPassword;