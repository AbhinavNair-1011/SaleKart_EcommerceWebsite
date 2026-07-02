import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Button from "../../../shared/components/Button";

import useAddToCart from "../../cart/hooks/useAddToCart";

function ProductCard({ product }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useAddToCart();

  function handleAddToCart() {
    mutate(
      {
        productId: product.id,
        quantity: 1,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: ["cart"],
          });

          toast.success("Added to cart.");
        },

        onError(error) {
          toast.error(
            error.response?.data?.error?.message ?? "Something went wrong.",
          );
        },
      },
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="mb-3 h-44 w-full rounded-lg object-cover"
      />

      <span className="mb-2 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
        {product.Category.name}
      </span>

      <h2 className="line-clamp-2 text-lg font-semibold">{product.name}</h2>

      <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-500">
        {product.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>

        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      </div>

      <Button
        className="mt-4 w-full"
        disabled={isPending}
        onClick={handleAddToCart}
      >
        {isPending ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
}

export default ProductCard;
