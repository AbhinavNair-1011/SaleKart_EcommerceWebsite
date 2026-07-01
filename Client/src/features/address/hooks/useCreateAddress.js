import { useMutation } from "@tanstack/react-query";

import { createAddress } from "../api/addressApi";

function useCreateAddress() {
  return useMutation({
    mutationFn: createAddress,
  });
}

export default useCreateAddress;