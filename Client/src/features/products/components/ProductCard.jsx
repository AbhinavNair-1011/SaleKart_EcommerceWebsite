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
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="mb-4 h-56 w-full rounded-lg object-cover"
      />

      <h2 className="text-lg font-semibold">{product.name}</h2>

      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
        {product.description}
      </p>

      <p className="mt-3 text-xl font-bold">₹{product.price}</p>

      <p className="mb-4 mt-1 text-sm text-gray-500">{product.Category.name}</p>

      <Button className="w-full" disabled={isPending} onClick={handleAddToCart}>
        {isPending ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
}

export default ProductCard;
