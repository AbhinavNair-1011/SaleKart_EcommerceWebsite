const { z } = require("zod");

const updateOrderStatusSchema = z.object({
  orderStatus: z.enum([    "pending",
    "processing",    "shipped",
        "delivered",    "cancelled",
  ]),
});

module.exports = {
  updateOrderStatusSchema,
};
