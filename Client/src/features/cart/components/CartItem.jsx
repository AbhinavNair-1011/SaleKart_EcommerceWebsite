import Button from "../../../shared/components/Button";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const product = item.Product;

  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-24 w-24 rounded-lg object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>

          <p className="text-gray-500">₹{product.price}</p>

          <p className="text-sm text-gray-500">Stock : {product.stock}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={() => onDecrease(item)}>-</Button>

        <span className="w-8 text-center font-semibold">{item.quantity}</span>

        <Button onClick={() => onIncrease(item)}>+</Button>
      </div>

      <div className="text-right">
        <p className="mb-2 text-lg font-bold">
          ₹{(Number(product.price) * item.quantity).toFixed(2)}
        </p>

        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={() => onRemove(item)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
