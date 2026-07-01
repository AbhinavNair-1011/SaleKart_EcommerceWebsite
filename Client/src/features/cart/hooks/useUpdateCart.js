import { useMutation } from "@tanstack/react-query";

import { updateCart } from "../api/cartApi";

function useUpdateCart() {
  return useMutation({
    mutationFn: updateCart,
  });
}

export default useUpdateCart;