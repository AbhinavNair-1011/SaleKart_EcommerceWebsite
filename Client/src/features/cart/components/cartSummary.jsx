import Button from "../../../shared/components/Button";

function CartSummary({ cart, onCheckout }) {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.Product.price) * item.quantity,
    0,
  );

  return (
<div className="rounded-2xl bg-white p-6 shadow-sm">
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900">
      Order Summary   
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      Review your order before checkout.
    </p>
  </div>

  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-gray-500">
        Subtotal
      </span>

      <span className="font-semibold text-gray-900">
        {total.toFixed(2)}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-gray-500">
        Shipping
      </span>

      <span className="font-semibold text-emerald-600">
        Free
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-gray-500">
        Taxes
      </span>

      <span className="font-semibold text-gray-900">
        Included
      </span>
    </div>

    <div className="my-2 border-t border-dashed border-slate-200" />

    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold text-gray-900">
        Total
      </span>

      <span className="text-3xl font-bold text-slate-900">
        {total.toFixed(2)}
      </span>
    </div>
  </div>

  <Button
    className="mt-8 w-full rounded-lg bg-slate-900 py-3 text-base font-semibold hover:bg-slate-800"
    onClick={onCheckout}
  >
    Proceed to Checkout 
  </Button>

  <p className="mt-4 text-center text-xs text-gray-400">
    Secure checkout . Free shipping . Easy returns
  </p>
</div>
  );
}

export default CartSummary;
