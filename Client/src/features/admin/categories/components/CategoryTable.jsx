function CategoryTable({ categories, onEdit, onDelete }) {
  return (
<div className="overflow-hidden rounded-2xl bg-white shadow-sm">
  <table className="w-full table-fixed">
    <thead className="bg-slate-50">
      <tr>
        <th className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 md:px-8 md:py-5 md:text-sm">
          Category
        </th>

        <th className="px-3 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 md:px-8 md:py-5 md:text-sm">
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
          <td className="px-3 py-4 md:px-8 md:py-5">
            <div className="flex min-w-0 items-center gap-2 md:gap-3">
              <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />

              <span className="truncate font-medium text-slate-900">
                {category.name}
              </span>
            </div>
          </td>

          <td className="px-3 py-4 md:px-8 md:py-5">
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onEdit(category)}
                className="rounded-md bg-slate-100 px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200 md:px-4 md:py-2 md:text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(category)}
                className="rounded-md bg-red-50 px-2 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 md:px-4 md:py-2 md:text-sm"
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
