const express = require("express");

const router = express.Router();

const validate = require("../middlewares/validate");

const {
  registerUsersSchema,
  loginUsersSchema,
  resendVerificationOtpSchema,
  verifyEmailSchema,
  changeVerificationEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validators/auth.validation");

const {
  register,
  login,
  refresh,
  logout,
  verifyEmail,
  resendVerificationOtp,
  changeVerificationEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

router.post("/register", validate(registerUsersSchema), register);

router.post("/login", validate(loginUsersSchema), login);
router.post("/refresh", refresh);

router.post("/logout", logout);
router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

router.post(
  "/resend-verification-otp",
  validate(resendVerificationOtpSchema),
  resendVerificationOtp,
);
router.patch(
  "/change-email",
  validate(changeVerificationEmailSchema),
  changeVerificationEmail,
);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);

router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
module.exports = router;

// router.get("/me");
