import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "../api/categoryApi";

function useDeleteCategory() {
  return useMutation({
    mutationFn: deleteCategory,
  });
}

export default useDeleteCategory;