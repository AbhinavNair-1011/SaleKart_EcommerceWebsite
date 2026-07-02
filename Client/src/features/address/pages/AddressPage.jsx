import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Button from "../../../shared/components/Button";
import Loader from "../../../shared/components/Loader";

import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";
import AddressModal from "../components/AddressModal";

import useAddresses from "../hooks/useAddresses";
import useCreateAddress from "../hooks/useCreateAddress";
import useUpdateAddress from "../hooks/useUpdateAddress";
import useDeleteAddress from "../hooks/useDeleteAddress";

function AddressPage() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [editingAddress, setEditingAddress] = useState(null);

  const { data, isLoading } = useAddresses();

  const { mutate: createAddress, isPending: isCreating } = useCreateAddress();

  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();

  const { mutate: deleteAddress } = useDeleteAddress();

  if (isLoading) return <Loader />;

  const addresses = data?.data?.addresses ?? [];

  function handleCreate(formData) {
    createAddress(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["addresses"],
        });

        toast.success("Address added.");

        setOpen(false);
      },
    });
  }

  function handleUpdate(formData) {
    updateAddress(
      {
        id: editingAddress.id,
        data: formData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["addresses"],
          });

          toast.success("Address updated.");

          setEditingAddress(null);

          setOpen(false);
        },
      },
    );
  }

  function handleDelete(address) {
    if (!confirm("Delete this address?")) return;

    deleteAddress(address.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["addresses"],
        });

        toast.success("Address deleted.");
      },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Addresses</h1>

        <Button
        className="bg-slate-600 hover:bg-slate-700"
          onClick={() => {
            setEditingAddress(null);
            setOpen(true);
          }}
        >
          + Add Address
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={(address) => {
              setEditingAddress(address);
              setOpen(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {open && (
        <AddressModal
          title={editingAddress ? "Edit Address" : "Add Address"}
          onClose={() => setOpen(false)}
        >
          <AddressForm
            defaultValues={editingAddress}
            onSubmit={editingAddress ? handleUpdate : handleCreate}
            isPending={isCreating || isUpdating}
            buttonText={editingAddress ? "Update Address" : "Add Address"}
          />
        </AddressModal>
      )}
    </div>
  );
}

export default AddressPage;
