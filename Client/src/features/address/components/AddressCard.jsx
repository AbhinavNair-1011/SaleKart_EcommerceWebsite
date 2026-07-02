function AddressCard({
  address,
  onEdit,
  onDelete,
}) {
  return (
<div className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md">
  <div className="flex items-start justify-between">
    <div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
        {address.addressType}
      </span>

      <div className="mt-4 space-y-1 text-sm leading-6 text-slate-700">
        <p className="font-medium text-slate-900">
          {address.houseNumber}, {address.area}
        </p>

        {address.landmark && (
          <p>Landmark: {address.landmark}</p>
        )}

        <p>
          {address.city}, {address.state}
        </p>

        <p className="font-medium">
          {address.pincode}
        </p>
      </div>
    </div>

    <div className="flex gap-2">
      <button
        onClick={() => onEdit(address)}
        className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(address)}
        className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
      >
        Delete
      </button>
    </div>
  </div>
</div>
  );
}

export default AddressCard;