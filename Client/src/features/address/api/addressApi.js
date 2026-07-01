import api from "../../../app/api/axios";

export async function createAddress(data) {
  const response = await api.post("/addresses", data);

  return response.data;
}

export async function getAddresses() {
  const response = await api.get("/addresses");

  return response.data;
}

export async function updateAddress({ id, data }) {
  const response = await api.patch(`/addresses/${id}`, data);

  return response.data;
}

export async function deleteAddress(id) {
  const response = await api.delete(`/addresses/${id}`);

  return response.data;
}