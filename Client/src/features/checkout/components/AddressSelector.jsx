import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/Button";

function AddressSelector({ addresses, selectedAddress, setSelectedAddress, onAddAddress }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">Select Address</h2>

      <div className="space-y-4">
        {addresses.map((address) => (
          <label
            key={address.id}
            className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition hover:border-blue-500"
          >
            <input
              type="radio"
              checked={selectedAddress === address.id}
              onChange={() => setSelectedAddress(address.id)}
            />

            <div>
              <p className="font-semibold capitalize">{address.addressType}</p>
              <p>
                
                    {address.houseNumber}, {address.area}
              </p>
              {address.landmark && <p>Landmark: {address.landmark}</p>}

              <p>
                {address.city}, {address.state}
              </p>

              <p>{address.pincode}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-5">
        <Button onClick={onAddAddress}>
          Add New Address
        </Button>
      </div>
    </div>
  );
}

export default AddressSelector;
