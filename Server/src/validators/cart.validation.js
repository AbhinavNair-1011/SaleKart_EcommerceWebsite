const { z } = require("zod");

const createCartSchema = z.object({
  productId: z.uuid(),

  quantity: z.number().int().min(1),
});

const updateCartSchema = z
  .object({
    quantity: z.number().int().min(1),
  })
  .strict();

module.exports = {
  createCartSchema,
  updateCartSchema,
};