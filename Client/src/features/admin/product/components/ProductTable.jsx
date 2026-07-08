function ProductTable({ products, onEdit, onDelete }) {
  return (
    <>
      <div className="space-y-4 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex gap-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-20 w-20 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  #{product.id.slice(0, 8)}
                </p>

                <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                  {product.Category.name}
                </span>
              </div>
            </div>

            <div className="mt-5 flex justify-between text-sm">
              <div>
                <p className="text-slate-500">Price</p>

                <p className="font-semibold">₹{product.price}</p>
              </div>

              <div>
                <p className="text-slate-500">Stock</p>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    product.stock > 10
                      ? "bg-emerald-100 text-emerald-700"
                      : product.stock > 0
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock}
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 rounded-lg bg-slate-100 py-2 text-sm font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(product)}
                className="flex-1 rounded-lg bg-red-50 py-2 text-sm font-medium text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <table className="w-full">
          <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
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

              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="transition hover:bg-slate-50">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-5">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-20 w-20 rounded-xl object-cover shadow-sm"
                        />

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-sm text-slate-400">
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

                    <td className="px-8 py-5 text-center">
                      <span className="font-bold text-slate-900">
                        ₹{product.price}
                      </span>
                    </td>

                    <td className="px-8 py-5 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
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
                          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(product)}
                          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
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
        </table>
      </div>
    </>
  );
}

export default ProductTable;
