import axios from "axios";

import queryClient from "../tanstack_query/queryClient";

const api = axios.create({
 baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

console.log(import.meta.env.VITE_API_URL)
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      return Promise.reject(error);
    }

    if (originalRequest.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");

        return api(originalRequest);
      } catch (refreshError) {
        queryClient.clear();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;