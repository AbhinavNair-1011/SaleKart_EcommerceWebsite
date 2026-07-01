import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../api/categoryApi";

function useCreateCategory() {
  return useMutation({
    mutationFn: createCategory,
  });
}

export default useCreateCategory;