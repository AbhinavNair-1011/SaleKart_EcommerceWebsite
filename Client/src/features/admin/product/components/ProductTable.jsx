function ProductTable({ products, onEdit, onDelete }) {
  return (
 <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
  <table className="w-full">
    <thead className="bg-slate-50">
      <tr>
        <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
          Product
        </th>

        <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
          Category
        </th>

        <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
          Price
        </th>

        <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
          Stock
        </th>

        <th className="px-8 py-5 text-right text-sm font-semibold uppercase tracking-wide text-slate-500">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {products.map((product) => (
        <tr
          key={product.id}
          className="border-t border-slate-100 transition hover:bg-slate-50"
        >
          <td className="px-8 py-5">
            <div className="flex items-center gap-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-24 w-24 rounded-lg object-cover"
              />

              <div>
                <p className="font-medium text-slate-900">
                  {product.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  #{product.id.slice(0, 8)}
                </p>
              </div>
            </div>
          </td>

          <td className="px-8 py-5">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {product.Category.name}
            </span>
          </td>

          <td className="px-8 py-5 text-center font-semibold text-slate-900">
            ₹{product.price}
          </td>

          <td className="px-8 py-5 text-center">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                product.stock > 10
                  ? "bg-emerald-100 text-emerald-700"
                  : product.stock > 0
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock}
            </span>
          </td>

          <td className="px-8 py-5">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => onEdit(product)}
                className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(product)}
                className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
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
