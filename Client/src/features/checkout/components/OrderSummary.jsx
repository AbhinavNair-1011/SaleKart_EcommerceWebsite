import Button from "../../../shared/components/Button";
import CheckoutItem from "./CheckoutItem";

function OrderSummary({ cart, onPlaceOrder, isPending }) {
  const subtotal = cart.reduce(
    (total, item) => total + Number(item.Product.price) * item.quantity,
    0,
  );

  const deliveryCharge = 0;

  const total = subtotal + deliveryCharge;

  return (
  <div className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/40">
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900">
      Order Summary
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      Review your order before placing it.
    </p>
  </div>

  <div className="space-y-4">
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Subtotal</span>

        <span className="font-semibold text-gray-900">
          ₹{subtotal.toFixed(2)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-gray-500">Delivery</span>

        <span className="font-semibold text-green-600">
          ₹{deliveryCharge.toFixed(2)}
        </span>
      </div>
    </div>

    <div className="space-y-3">
      {cart.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
    </div>

    <div className="rounded-2xl ">
      <div className="flex items-center justify-between p-2">
        <span className="text-lg font-medium">
          Total
        </span>

        <span className="text-xl font-bold">
          {total.toFixed(2)}
        </span>
      </div>
    </div>
  </div>

  <Button
    className="mt-6 w-full py-3 text-base font-semibold"
    onClick={onPlaceOrder}
    disabled={isPending}
  >
    {isPending ? "Placing Order..." : "Place Order"}
  </Button>
</div>
  );
}

export default OrderSummary;
