function AddressCard({
  address,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded bg-blue-100 px-3 py-1 text-sm font-medium capitalize text-blue-700">
          {address.addressType}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(address)}
            className="rounded bg-blue-600 px-3 py-1 text-white"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(address)}
            className="rounded bg-red-600 px-3 py-1 text-white"
          >
            Delete
          </button>
        </div>
      </div>

      <p>{address.houseNumber}</p>

      <p>{address.area}</p>

      {address.landmark && (
        <p>{address.landmark}</p>
      )}

      <p>
        {address.city}, {address.state}
      </p>

      <p>{address.pincode}</p>
    </div>
  );
}

export default AddressCard;