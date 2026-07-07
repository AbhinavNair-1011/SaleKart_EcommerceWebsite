import api from "../../../../app/api/axios";

export async function getAllOrders(params ) {
  const response = await api.get("/orders/all", {
    params,
  });

  return response.data;
}

export async function updateOrderStatus({ id, orderStatus }) {
  const response = await api.patch(`/orders/${id}`, {
    orderStatus,
  });

  return response.data;
}
export async function getAdminOrder(id) {
  const response = await api.get(`/orders/admin/${id}`);

  return response.data;
}
