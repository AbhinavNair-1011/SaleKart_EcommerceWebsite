import { useMutation } from "@tanstack/react-query";

import { deleteCart } from "../api/cartApi";

function useDeleteCart() {
  return useMutation({
    mutationFn: deleteCart,
  });
}

export default useDeleteCart;