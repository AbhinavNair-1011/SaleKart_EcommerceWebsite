import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useMe } from "../../auth/hooks/useMe";

import ProfileForm from "../components/ProfileForm";

import Button from "../../../shared/components/Button";
import Loader from "../../../shared/components/Loader";

import AddressCard from "../../address/components/AddressCard";
import AddressForm from "../../address/components/AddressForm";
import AddressModal from "../../address/components/AddressModal";

import useAddresses from "../../address/hooks/useAddresses";
import useCreateAddress from "../../address/hooks/useCreateAddress";
import useUpdateAddress from "../../address/hooks/useUpdateAddress";
import useDeleteAddress from "../../address/hooks/useDeleteAddress";

function ProfilePage() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useMe();

  const { data: addressData } = useAddresses();

  const { mutate: createAddress, isPending: isCreating } =
    useCreateAddress();

  const { mutate: updateAddress, isPending: isUpdating } =
    useUpdateAddress();

  const { mutate: deleteAddress } =
    useDeleteAddress();

  const [open, setOpen] = useState(false);

  const [editingAddress, setEditingAddress] =
    useState(null);

  if (isLoading) return <Loader />;

  const addresses =
    addressData?.data?.addresses ?? [];

  function handleCreate(formData) {
    createAddress(formData, {
      onSuccess() {
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
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: ["addresses"],
          });

          toast.success("Address updated.");

          setEditingAddress(null);

          setOpen(false);
        },
      }
    );
  }

  function handleDelete(address) {
    if (!confirm("Delete this address?")) return;

    deleteAddress(address.id, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ["addresses"],
        });

        toast.success("Address deleted.");
      },
    });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-8">
  <div>
    

    <p className="mt-2 text-gray-500">
      Manage your personal information and saved addresses.
    </p>
  </div>

  <section className="rounded-xl bg-white p-6 shadow-sm">
    <h2 className="mb-6 text-xl font-semibold">
      Personal Information
    </h2>

    <ProfileForm user={user} />
  </section>

  <section className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Saved Addresses
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose, edit or add delivery addresses.
        </p>
      </div>

      <Button
        onClick={() => {
          setEditingAddress(null);
          setOpen(true);
        }}
      >
        + Add Address
      </Button>
    </div>

    {addresses.length === 0 ? (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-medium text-gray-700">
          No saved addresses
        </p>

        <p className="mt-2 text-gray-500">
          Add your first delivery address to get started.
        </p>
      </div>
    ) : (
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
    )}
  </section>

  {open && (
    <AddressModal
      title={
        editingAddress
          ? "Edit Address"
          : "Add Address"
      }
      onClose={() => setOpen(false)}
    >
      <AddressForm
        defaultValues={editingAddress}
        onSubmit={
          editingAddress
            ? handleUpdate
            : handleCreate
        }
        isPending={
          isCreating || isUpdating
        }
        buttonText={
          editingAddress
            ? "Update Address"
            : "Add Address"
        }
      />
    </AddressModal>
  )}
</div>
  );
}

export default ProfilePage;