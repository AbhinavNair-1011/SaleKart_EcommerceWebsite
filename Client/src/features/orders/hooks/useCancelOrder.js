import { useMutation } from "@tanstack/react-query";

import { cancelOrder } from "../api/orderApi";

function useCancelOrder() {
  return useMutation({
    mutationFn: cancelOrder,
  });
}

export default useCancelOrder;
