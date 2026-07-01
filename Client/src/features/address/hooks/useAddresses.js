import { useQuery } from "@tanstack/react-query";

import { getAddresses } from "../api/addressApi";

function useAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
}

export default useAddresses;
