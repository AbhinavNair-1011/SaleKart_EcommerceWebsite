import { z } from "zod";

const addressSchema = z.object({
  houseNumber: z.string().trim().min(1, "House number is required"),

  area: z.string().trim().min(2, "Area is required"),

  landmark: z.string().trim().optional(),

  city: z.string().trim().min(2, "City is required"),

  state: z.string().trim().min(2, "State is required"),

  pincode: z.string(),

  addressType: z.enum(["home", "work", "other"]),
});

export default addressSchema;
