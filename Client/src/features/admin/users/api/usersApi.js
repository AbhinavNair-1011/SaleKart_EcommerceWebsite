import api from "../../../../app/api/axios";

export async function getUsers(params) {
  const response = await api.get("/users/all",{
    params
  });

  return response.data;
}