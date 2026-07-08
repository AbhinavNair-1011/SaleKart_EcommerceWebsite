import Button from "../../../shared/components/Button";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const product = item.Product;
  console.log(item)

  return (
<div className="flex flex-col gap-5 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between md:p-5">
  <div className="flex gap-4 md:items-center md:gap-5">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="h-20 w-20 rounded-lg object-cover md:h-24 md:w-24"
    />

    <div>
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
        {product.Category?.name}
      </span>

      <h3 className="mt-3 text-base font-semibold text-slate-900 md:text-lg">
        {product.name}
      </h3>

      <div className="mt-2 flex flex-col gap-1 text-sm md:flex-row md:items-center md:gap-4">
        <span className="font-semibold text-slate-900">
          {product.price}
        </span>

        <span className="text-slate-400">
          Stock: {product.stock}
        </span>
      </div>
    </div>
  </div>


  <div className="flex items-end justify-between  gap-4 md:gap-8">
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


    <div className="min-w-[100px] text-right md:min-w-[130px]">
      <p className="text-sm text-slate-400">
        Total
      </p>

      <p className="mt-1 text-xl font-bold text-slate-900 md:text-2xl">
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
