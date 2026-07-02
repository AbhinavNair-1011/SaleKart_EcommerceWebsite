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
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>

          <span>₹{deliveryCharge.toFixed(2)}</span>
        </div>

        <hr />
        <div className="mb-6">
          {cart.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))}
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>

          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        className="mt-6 w-full"
        onClick={onPlaceOrder}
        disabled={isPending}
      >
        {isPending ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  );
}

export default OrderSummary;
