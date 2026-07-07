const { z } = require("zod");

const updateProfileSchema = z
  .object({
    name: z.string().trim().min(3).optional(),

    userName: z.string().trim().min(3).optional(),

    phone: z.string().trim().min(9).max(10).optional(),
  })
  .strict();

module.exports = {
  updateProfileSchema,
};