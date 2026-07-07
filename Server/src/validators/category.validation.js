const { z } = require("zod");

const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name cannot exceed 50 characters"),
});

const updateCategorySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Category name must be at least 2 characters")
      .max(50, "Category name cannot exceed 50 characters")
      .optional(),
  })
  .strict();

const getCategorySchema = z.object({
  limit: z.coerce.number().optional().optional(),
  order: z.enum(["asc", "dsc"]).optional(),
  search: z.string().optional(),
  sortBy: z.any().optional(),
  page: z.coerce.number().int().min(1).optional(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
};
