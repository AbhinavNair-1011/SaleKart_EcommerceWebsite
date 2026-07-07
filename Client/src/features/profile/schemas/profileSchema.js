import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters"),

  userName: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters"),

  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number cannot exceed 10 digits"),
});

export default profileSchema;