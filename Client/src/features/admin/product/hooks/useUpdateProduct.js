import { useMutation } from "@tanstack/react-query";

import { updateProduct } from "../api/productApi";

function useUpdateProduct() {
  return useMutation({
    mutationFn: updateProduct,
  });
}

export default useUpdateProduct;