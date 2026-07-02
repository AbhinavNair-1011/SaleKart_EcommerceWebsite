function OrderItem({ item }) {
  return (
    <div className="flex items-center gap-4 border-b py-4 last:border-b-0">
      <img
        src={item.productImage}
        alt={item.productName}
        className="h-20 w-20 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold">
          {item.productName}
        </h3>

        <p className="text-gray-500">
          ₹{item.price}
        </p>

        <p className="text-sm text-gray-500">
          Quantity : {item.quantity}
        </p>
      </div>
    </div>
  );
}

export default OrderItem;