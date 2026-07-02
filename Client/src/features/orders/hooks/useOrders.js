import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../api/orderApi";

function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}

export default useOrders;
