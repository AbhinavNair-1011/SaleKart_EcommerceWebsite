import api from "../../../app/api/axios";

export async function getOrders() {
  const response = await api.get("/orders");

  console.log(response);
  return response.data;
}

export async function getOrder(id) {
  const response = await api.get(`/orders/${id}`);

  return response.data;
}

export async function updateOrderStatus({ id, orderStatus }) {
  const response = await api.patch(`/orders/${id}`, {
    orderStatus,
  });

  return response.data;
}

export async function cancelOrder(id) {
  const response = await api.patch(`/orders/${id}/cancel`);

  return response.data;
}
