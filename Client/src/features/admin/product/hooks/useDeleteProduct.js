import { useMutation } from "@tanstack/react-query";

import { deleteProduct } from "../api/productApi";

function useDeleteProduct() {
  return useMutation({
    mutationFn: deleteProduct,
  });
}

export default useDeleteProduct;