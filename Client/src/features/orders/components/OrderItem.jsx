function OrderItem({ item }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
  <img
    src={item.productImage}
    alt={item.productName}
    className="h-20 w-20 rounded-xl object-cover shadow-sm"
  />

  <div className="flex flex-1 items-center justify-between">
    <div>
      <h3 className="font-semibold text-gray-900">
        {item.productName}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {item.price}
      </p>

      <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600">
        Qty: {item.quantity}
      </span>
    </div>

    <div className="text-right">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        Total
      </p>

      <p className="text-lg font-bold text-blue-600">
        {(Number(item.price) * item.quantity).toFixed(2)}
      </p>
    </div>
  </div>
</div>
  );
}

export default OrderItem;