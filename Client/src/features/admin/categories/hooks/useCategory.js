import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../api/categoryApi";

function useCategory(id) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
}

export default useCategory;