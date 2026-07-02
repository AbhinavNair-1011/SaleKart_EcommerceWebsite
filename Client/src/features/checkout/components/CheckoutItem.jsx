function CheckoutItem({ item }) {
  return (
    <div className="flex items-center gap-4 border-b py-4 last:border-b-0">
  
      <div className="flex-1">
        <h3 className="font-semibold">{item.Product.name}</h3>

        <p className="text-gray-500">Qty : {item.quantity}</p>
      </div>

      <p className="font-semibold">
        ₹{(Number(item.Product.price) * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}

export default CheckoutItem;
