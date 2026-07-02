import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email"),
});

export const resetPasswordSchema = z.object({
  email: z.email("Invalid email"),

  otp: z.string().trim().length(6, "OTP must be 6 digits"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});
