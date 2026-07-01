import Button from "../../../shared/components/Button";

function CartSummary({ cart, onCheckout }) {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.Product.price) * item.quantity,
    0,
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

      <div className="mb-6 flex justify-between">
        <span>Total</span>

        <span className="text-xl font-bold">₹{total.toFixed(2)}</span>
      </div>

      <Button className="w-full" onClick={onCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
}

export default CartSummary;
