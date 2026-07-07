import api from "../../../../app/api/axios";

export async function createProduct(data) {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function getProducts(params) {
  const response = await api.get("/products", {
    params,
  });
  return response.data
}

export async function getProduct(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function updateProduct({ id, data }) {
  const response = await api.patch(`/products/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function deleteProduct(id) {
  const response = await api.delete(`/products/${id}`);

  return response.data;
}
