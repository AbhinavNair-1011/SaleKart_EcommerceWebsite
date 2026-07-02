import { useMutation } from "@tanstack/react-query";

import { verifyPayment } from "../api/checkoutApi";

function useVerifyPayment() {
  return useMutation({
    mutationFn: verifyPayment,
  });
}

export default useVerifyPayment;