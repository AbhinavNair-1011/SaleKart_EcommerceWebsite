import { useQuery } from "@tanstack/react-query";

import { getAdminOrder } from "../api/ordersApi";

function useAdminOrder(id) {
  return useQuery({
    queryKey: ["admin-order", id],
    queryFn: () => getAdminOrder(id),

  });
}

export default useAdminOrder;
