import { useQuery } from "@tanstack/react-query";

import { getOrder } from "../api/orderApi";

function useOrder(id) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
    
  });
}

export default useOrder;
