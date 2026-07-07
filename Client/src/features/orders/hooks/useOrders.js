import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../api/orderApi";

function useOrders(params) {
  return useQuery({
    queryKey: ["orders" , params],
    queryFn: () => getOrders(params),
  });
}

export default useOrders;
