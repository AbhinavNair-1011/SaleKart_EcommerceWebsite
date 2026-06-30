const { z } = require("zod");

const updateProfileSchema = z
  .object({
    name: z.string().trim().min(3).optional(),

    userName: z.string().trim().min(3).optional(),

    phone: z.string().trim().min(10).max(15).optional(),
  })
  .strict();

module.exports = {
  updateProfileSchema,
};