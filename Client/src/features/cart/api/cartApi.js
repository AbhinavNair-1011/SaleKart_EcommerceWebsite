import api from "../../../app/api/axios";

export async function getCart() {
  const response = await api.get("/cart");

  return response.data;
}

export async function addToCart(data) {
  const response = await api.post("/cart", data);

  return response.data;
}

export async function updateCart({ id, data }) {
  const response = await api.patch(`/cart/${id}`, data);

  return response.data;
}

export async function deleteCart(id) {
  const response = await api.delete(`/cart/${id}`);

  return response.data;
}