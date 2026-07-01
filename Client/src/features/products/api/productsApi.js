import api from "../../../app/api/axios";

export async function getProducts(params) {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
}