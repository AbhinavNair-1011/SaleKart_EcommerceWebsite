import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../../../shared/components/Loader";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

import useCart from "../hooks/useCart";
import useUpdateCart from "../hooks/useUpdateCart";
import useDeleteCart from "../hooks/useDeleteCart";

function CartPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isLoading } = useCart();

  const { mutate: updateCart } = useUpdateCart();

  const { mutate: deleteCart } = useDeleteCart();

  if (isLoading) {
    return <Loader />;
  }

  const cart = data?.data?.cart ?? [];

  function updateQuantity(item, quantity) {
    updateCart(
      {
        id: item.id,
        data: {
          quantity,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["cart"],
          });
        },
      },
    );
  }

  function handleRemove(item) {
    deleteCart(item.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });

        toast.success("Removed from cart.");
      },
    });
  }

  return (
  <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
  <div className="mb-6 md:mb-8">
    <p className="mt-2 text-sm text-gray-800 md:text-base">
      Review your items before proceeding to checkout.
    </p>
  </div>

  <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:gap-8">
    <div className="space-y-5 rounded-2xl border border-gray-200 bg-gray-50 p-4 md:p-6">
      {cart.length === 0 ? (
        <div className="flex h-60 md:h-72 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white">
          <div className="text-center px-4">
            <p className="text-xl md:text-2xl font-semibold text-gray-800">
              Your cart is empty
            </p>

            <p className="mt-2 text-sm md:text-base text-gray-500">
              Add some products to get started.
            </p>
          </div>
        </div>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() =>
              updateQuantity(item, item.quantity + 1)
            }
            onDecrease={() => {
              if (item.quantity === 1) {
                handleRemove(item);
                return;
              }

              updateQuantity(item, item.quantity - 1);
            }}
            onRemove={handleRemove}
          />
        ))
      )}
    </div>

    {cart.length !== 0 && (
      <div className="lg:sticky lg:top-6 lg:self-start">
        <CartSummary
          cart={cart}
          onCheckout={() => navigate("/checkout")}
        />
      </div>
    )}
  </div>
</div>
  );
}

export default CartPage;
