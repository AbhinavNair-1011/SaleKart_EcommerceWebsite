import { z } from "zod";

const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  price: z.coerce
    .number()
    .positive("Price must be greater than 0"),

  stock: z.coerce
    .number()
    .int()
    .min(0, "Stock cannot be negative"),

  imageUrl: z
    .string()
    .trim()
    .min(1, "Image URL is required"),

  categoryId: z
    .string()
    .uuid("Please select a category"),
});

export default productSchema;