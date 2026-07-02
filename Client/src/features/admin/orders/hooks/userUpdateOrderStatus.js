import { useMutation } from "@tanstack/react-query";

import { updateOrderStatus } from "../api/ordersApi";

function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: updateOrderStatus,
  });
}

export default useUpdateOrderStatus;