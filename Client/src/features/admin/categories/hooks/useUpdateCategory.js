import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "../api/categoryApi";

function useUpdateCategory() {
  return useMutation({
    mutationFn: updateCategory,
  });
}

export default useUpdateCategory;