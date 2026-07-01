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
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        {cart.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center">
            Your cart is empty.
          </div>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => updateQuantity(item, item.quantity + 1)}
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

      <CartSummary cart={cart} onCheckout={() => navigate("/checkout")} />
    </div>
  );
}

export default CartPage;
