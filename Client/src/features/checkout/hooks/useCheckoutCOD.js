import { useMutation } from "@tanstack/react-query";

import { CheckoutCod } from "../api/checkoutApi";

function useCheckoutCod() {
  return useMutation({
    mutationFn: CheckoutCod,
  });
}

export default useCheckoutCod;
