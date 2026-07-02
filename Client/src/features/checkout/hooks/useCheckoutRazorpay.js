import { useMutation } from "@tanstack/react-query";

import { checkoutRazorpay } from "../api/checkoutApi";

function useCheckoutRazorpay() {
  return useMutation({
    mutationFn: checkoutRazorpay,
  });
}

export default useCheckoutRazorpay;
