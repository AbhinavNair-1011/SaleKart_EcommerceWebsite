import { useQuery } from "@tanstack/react-query";

import { getAllOrders } from "../api/ordersApi";

function useAllOrders() {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });
}

export default useAllOrders;
