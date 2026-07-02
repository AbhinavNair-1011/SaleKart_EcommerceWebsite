import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/Button";

function AddressSelector({ addresses, selectedAddress, setSelectedAddress, onAddAddress }) {
  const navigate = useNavigate();

  return (
 <div className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/40">
  <div className="mb-6 flex items-center justify-between">
    <div>
      <h2 className="text-xl font-bold text-gray-900">
        Delivery Address
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Choose where you'd like your order delivered.
      </p>
    </div>

    <Button onClick={onAddAddress}>
      + Add Address
    </Button>
  </div>

  <div className="space-y-4">
    {addresses.map((address) => (
      <label
        key={address.id}
        className={`flex cursor-pointer items-start gap-4 rounded-2xl p-5 transition-all ${
          selectedAddress === address.id
            ? "bg-blue-50 shadow-md"
            : "bg-slate-50 hover:bg-slate-100"
        }`}
      >
        <input
          type="radio"
          checked={selectedAddress === address.id}
          onChange={() => setSelectedAddress(address.id)}
          className="mt-1 h-4 w-4 accent-blue-600"
        />

        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase text-white">
              {address.addressType}
            </span>

            {selectedAddress === address.id && (
              <span className="text-sm font-medium text-blue-600">
                Selected
              </span>
            )}
          </div>

          <p className="text-sm leading-6 text-gray-700">
            {address.houseNumber}, {address.area}
          </p>

          {address.landmark && (
            <p className="text-sm text-gray-500">
              Landmark: {address.landmark}
            </p>
          )}

          <p className="text-sm text-gray-700">
            {address.city}, {address.state}
          </p>

          <p className="text-sm font-medium text-gray-900">
            {address.pincode}
          </p>
        </div>
      </label>
    ))}
  </div>
</div>
  );
}

export default AddressSelector;
