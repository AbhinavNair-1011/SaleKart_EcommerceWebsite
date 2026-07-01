import { useMutation } from "@tanstack/react-query";

import { createProduct } from "../api/productApi";

function useCreateProduct() {
  return useMutation({
    mutationFn: createProduct,
  });
}

export default useCreateProduct;