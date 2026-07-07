import { useQuery } from "@tanstack/react-query";

import { getAllOrders } from "../api/ordersApi";

function useAllOrders(params) {
  return useQuery({
    queryKey: ["admin-orders",params],
    queryFn: ()=>getAllOrders(params),
  });
}

export default useAllOrders;
