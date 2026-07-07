const { z } = require("zod");

const updateOrderStatusSchema = z.object({
  orderStatus: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
});
const getMyOrdersSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});
const getAllOrdersSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  search: z.string("invalid search format").optional(),
});

module.exports = {
  updateOrderStatusSchema,
  getAllOrdersSchema,
};
