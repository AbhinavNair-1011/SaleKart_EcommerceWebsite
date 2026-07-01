const { z } = require("zod");

const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(100),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  price: z.number().positive("Price must be greater than 0"),

  stock: z.number().int().min(0, "Stock cannot be negative"),

  imageUrl: z.string().trim().min(1, "Image URL is required"),

  categoryId: z.uuid("Invalid category"),
});

const updateProductSchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),

    description: z.string().trim().min(10).optional(),

    price: z.number().positive().optional(),

    stock: z.number().int().min(0).optional(),

    imageUrl: z.string().trim().optional(),

    categoryId: z.uuid().optional(),
  })
  .strict();

const getProductsQuerySchema = z.object({
  q: z.string().trim().optional(),

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
