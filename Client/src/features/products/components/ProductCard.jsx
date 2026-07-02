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
<div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
  <div className="relative overflow-hidden">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
    />

    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-800 backdrop-blur">
      {product.Category.name}
    </span>
  </div>

  <div className="flex flex-1 flex-col p-5">
    <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-slate-900">
      {product.name}
    </h2>

    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-500">
      {product.description}
    </p>

    <div className="mt-5 flex items-end justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Price
        </p>

        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          ₹{product.price}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          product.stock > 10
            ? "bg-emerald-100 text-emerald-700"
            : product.stock > 0
            ? "bg-amber-100 text-amber-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {product.stock > 0 ? `${product.stock} Left` : "Out of Stock"}
      </span>
    </div>

    <Button
      className="mt-5 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      disabled={isPending}
      onClick={handleAddToCart}
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  </div>
</div>
  );
}

export default ProductCard;
