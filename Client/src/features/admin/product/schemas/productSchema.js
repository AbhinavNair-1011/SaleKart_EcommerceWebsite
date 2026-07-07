import { z } from "zod";

const productSchema = z.object({
  name: z.string().trim().min(2).max(100),

  description: z.string().trim().min(10),

  price: z.coerce.number().positive(),

  stock: z.coerce.number().int().min(0),

  categoryId: z.string().uuid(),

  image: z.any(),
});

export default productSchema;
