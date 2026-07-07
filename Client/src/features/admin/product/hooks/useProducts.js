import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/productApi";

function useProducts(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}

export default useProducts;