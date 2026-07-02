const z = require("zod");

const registerUsersSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[A-Za-z\s]+$/, "Full name can only contain letters and spaces")
    .min(3, "Full name must be at least 3 characters"),

  userName: z.string().trim().min(3, "Username must be at least 3 characters"),

  email: z
    .email("Invalid email address")
    .transform((value) => value.toLowerCase()),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginUsersSchema = z.object({
  email: z.email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

const verifyEmailSchema = z.object({
  email: z.email("Invalid email"),

  otp: z.string().trim().length(6, "OTP must be 6 digits"),
});

const resendVerificationOtpSchema = z.object({
  email: z.email("Invalid email"),
});
 const changeVerificationEmailSchema = z.object({
  oldEmail: z.email("Invalid email"),

  newEmail: z.email("Invalid email"),
});

 const forgotPasswordSchema = z.object({
  email: z.email("Invalid email"),
});

 const resetPasswordSchema = z.object({
  email: z.email("Invalid email"),

  otp: z
    .string()
    .trim()
    .length(6, "OTP must be 6 digits"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

module.exports = {
  registerUsersSchema,
  loginUsersSchema,
  verifyEmailSchema,
  resendVerificationOtpSchema,
  changeVerificationEmailSchema,
  resetPasswordSchema,
  forgotPasswordSchema
};
