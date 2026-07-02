import { useMutation } from "@tanstack/react-query";

import { updateOrderStatus } from "../api/orderApi";

function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: updateOrderStatus,
  });
}

export default useUpdateOrderStatus;
