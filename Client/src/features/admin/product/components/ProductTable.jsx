function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">Image</th>

            <th className="px-6 py-4 text-left">Product</th>

            <th className="px-6 py-4 text-left">Category</th>

            <th className="px-6 py-4 text-center">Price</th>

            <th className="px-6 py-4 text-center">Stock</th>

            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              </td>

              <td className="px-6 py-4">
                <p className="font-medium">{product.name}</p>
              </td>

              <td className="px-6 py-4">{product.Category.name}</td>

              <td className="px-6 py-4 text-center">₹{product.price}</td>

              <td className="px-6 py-4 text-center">{product.stock}</td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(product)}
                    className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
