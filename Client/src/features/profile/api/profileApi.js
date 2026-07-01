import api from "../../../app/api/axios";

export async function updateProfile(data) {
  const response = await api.patch("/users/me", data);

  return response.data.data.user;
}