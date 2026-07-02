import api from "../../../app/api/axios";

export async function CheckoutCod(data) {
  const response = await api.post("/checkout/cod", data);

  return response.data;
}

export async function checkoutRazorpay(data) {
  const response = await api.post("/checkout/razorpay", data);

  return response.data;
}

export async function verifyPayment(data) {
  const response = await api.post("/payments/verify", data);

  return response.data;
}
