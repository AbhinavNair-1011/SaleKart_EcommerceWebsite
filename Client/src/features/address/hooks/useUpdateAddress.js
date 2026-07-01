import { useMutation } from "@tanstack/react-query";

import { updateAddress } from "../api/addressApi";

function useUpdateAddress() {
  return useMutation({
    mutationFn: updateAddress,
  });
}

export default useUpdateAddress;