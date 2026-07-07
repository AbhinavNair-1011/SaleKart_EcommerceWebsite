function CategoryTable({ categories, onEdit, onDelete }) {
  return (
  <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
  <table className="w-full">
    <thead className="bg-slate-50">
      <tr>
        <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
          Category
        </th>

        <th className="px-8 py-5 text-right text-sm font-semibold uppercase tracking-wide text-slate-500">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {categories.map((category) => (
        <tr
          key={category.id}
          className="border-t border-slate-100 transition hover:bg-slate-50"
        >
          <td className="px-8 py-5">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />

              <span className="font-medium text-slate-900">
                {category.name}
              </span>
            </div>
          </td>

          <td className="px-8 py-5">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => onEdit(category)}
                className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(category)}
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

export default CategoryTable;
