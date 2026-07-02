import api from "../../../app/api/axios";

export async function registerUser(userData) {
  const response = await api.post("/auth/register", userData);

  return response.data.data.user;
}
export async function loginUser(userData) {
  const response = await api.post("/auth/login", userData);

  return response.data.data.user;
}

export async function logoutUser() {
  const response = await api.post("/auth/logout");

  return response.data;
}

export async function getMyProfile() {
  const response = await api.get("/users/me");

  return response.data.data.user;
}

export async function verifyEmail(data) {
  const response = await api.post("/auth/verify-email", data);

  return response.data;
}

export async function resendVerificationOtp(data) {
  const response = await api.post("/auth/resend-verification-otp", data);

  return response.data;
}

export async function changeVerificationEmail(data) {
  const response = await api.patch("/auth/change-email", data);

  return response.data;
}

export async function forgotPassword(data) {
  const response = await api.post("/auth/forgot-password", data);

  return response.data;
}

export async function resetPassword(data) {
  const response = await api.post("/auth/reset-password", data);

  return response.data;
}
