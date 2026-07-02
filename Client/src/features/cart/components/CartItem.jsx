import Button from "../../../shared/components/Button";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const product = item.Product;

  return (
   <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">
  <div className="flex items-center gap-5">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="h-24 w-24 rounded-lg object-cover"
    />

    <div>
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
        {product.Category?.name}
      </span>

      <h3 className="mt-3 text-lg font-semibold text-slate-900">
        {product.name}
      </h3>

      <div className="mt-2 flex items-center gap-4 text-sm">
        <span className="font-semibold text-slate-900">
          {product.price}
        </span>

        <span className="text-slate-400">
          Stock: {product.stock}
        </span>
      </div>
    </div>
  </div>

  <div className="flex items-center gap-8">
    <div className="flex items-center rounded-lg bg-slate-100 p-1">
      <button
        onClick={() => onDecrease(item)}
        className="flex h-8 w-8 items-center justify-center rounded-md text-lg font-semibold transition hover:bg-white"
      >
      -
      </button>

      <span className="w-10 text-center text-sm font-semibold text-slate-900">
        {item.quantity}
      </span>

      <button
        onClick={() => onIncrease(item)}
        className="flex h-8 w-8 items-center justify-center rounded-md text-lg font-semibold transition hover:bg-white"
      >
        +
      </button>
    </div>

    <div className="min-w-[130px] text-right">
      <p className="text-sm text-slate-400">
        Total
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {(Number(product.price) * item.quantity).toFixed(2)}
      </p>

      <Button
        className="mt-3 w-full rounded-lg bg-slate-600 text-sm hover:bg-red-900"
        onClick={() => onRemove(item)}
      >
        Remove
      </Button>
    </div>
  </div>
</div>
  );
}

export default CartItem;
