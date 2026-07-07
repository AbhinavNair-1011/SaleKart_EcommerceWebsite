const { z } = require("zod");

const createProductSchema = z.object({
  name: z.string().trim().min(2).max(100),

  description: z.string().trim().min(10),

  price: z.coerce.number().positive(),

  stock: z.coerce.number().int().min(0),

  categoryId: z.string().uuid(),
});

const updateProductSchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),

    description: z.string().trim().min(10).optional(),

    price: z.coerce.number().positive(),

    stock: z.coerce.number().int().min(0),

    categoryId: z.uuid().optional(),
  })
  .strict();

const getProductsQuerySchema = z.object({
  search: z.string().trim().optional(),

  categoryId: z.string().optional(),

  page: z.coerce.number().int().min(1).optional(),

  limit: z.coerce.number().int().min(1).max(100).optional(),

  sortBy: z.enum(["name", "price", "createdAt"]).optional(),

  order: z.enum(["asc", "desc"]).optional(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductsQuerySchema,
};
