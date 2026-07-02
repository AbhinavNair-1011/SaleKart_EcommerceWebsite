function CheckoutItem({ item }) {
  return (
<div className="flex items-center justify-between rounded-xl border-b border-slate-200 px-3 py-2">
  <div>
    <h3 className="font-semibold text-gray-900">
      {item.Product.name}
    </h3>

    <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
      Qty: {item.quantity}
    </span>
  </div>

  <p className="text-xl font-bold text-blue-600">
    {(Number(item.Product.price) * item.quantity).toFixed(2)}
  </p>
</div>
  );
}

export default CheckoutItem;
