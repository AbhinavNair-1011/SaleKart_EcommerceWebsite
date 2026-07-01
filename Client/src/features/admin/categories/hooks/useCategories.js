import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categoryApi";

function useCategories(params) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
  });
}

export default useCategories;