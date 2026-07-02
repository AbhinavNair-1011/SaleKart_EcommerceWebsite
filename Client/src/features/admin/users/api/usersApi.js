import api from "../../../../app/api/axios";

export async function getUsers() {
  const response = await api.get("/users/all");

  return response.data;
}