const { z } = require("zod");

const verifyPaymentSchema = z.object({
  addressId: z.uuid(),

  razorpay_order_id: z.string(),

  razorpay_payment_id: z.string(),

  razorpay_signature: z.string(),
});

module.exports = {
  verifyPaymentSchema,
};