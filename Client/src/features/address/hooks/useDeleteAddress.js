import { useMutation } from "@tanstack/react-query";

import { deleteAddress } from "../api/addressApi";

function useDeleteAddress() {
  return useMutation({
    mutationFn: deleteAddress,
  });
}

export default useDeleteAddress;