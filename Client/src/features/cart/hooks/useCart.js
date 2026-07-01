import { useQuery } from "@tanstack/react-query";

import { getCart } from "../api/cartApi";

function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
}

export default useCart;