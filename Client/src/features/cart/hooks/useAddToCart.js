import { useMutation } from "@tanstack/react-query";

import { addToCart } from "../api/cartApi";

function useAddToCart() {
  return useMutation({
    mutationFn: addToCart,
  });
}

export default useAddToCart;