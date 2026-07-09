const bcrypt = require("bcryptjs");

const { User, Session, Verification } = require("../models");

const AppError = require("../utils/AppError.js");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/jwt.js");

const { sequelize } = require("../config/db");

const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");

const hashToken = require("../utils/hashToken");
const {
  accessCookieOptions,
  refreshCookieOptions,
} = require("../shared/cookieOptions");
const {
  emailVerificationTemplate,
  passwordResetTemplate,
} = require("../utils/EmailTemplate.js");

async function register(req, res) {
  let { name, email, password, userName } = req.body;

  email = email.trim().toLowerCase();
  userName = userName.trim().toLowerCase();

  const existingEmail = await User.findOne({
    where: { email },
  });

  if (existingEmail) {
    if (existingEmail.isVerifed) {
      await existingEmail.destroy();
    } else {
      throw new AppError("Email already exists", 409, "ConflictError");
    }
  }

  const existingUsername = await User.findOne({
    where: { userName },
  });

  if (existingUsername) {
    throw new AppError("Username already exists", 409, "ConflictError");
  }

  const transaction = await sequelize.transaction();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOtp();

    const user = await User.create(
      {
        name,
        email,
        password: hashedPassword,
        userName,
        role: "user",
      },
      {
        transaction,
      },
    );
    await Verification.destroy({
      where: {
        userId: user.id,
        type: "EMAIL_VERIFICATION",
      },
      transaction,
    });

    await Verification.create(
      {
        userId: user.id,
        type: "EMAIL_VERIFICATION",
        codeHash: hashToken(otp),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      {
        transaction,
      },
    );


    await sendEmail({
      to: user.email,

      subject: "Verify your Email",

      htmlContent: emailVerificationTemplate(otp),
    });

    
    await transaction.commit();
    return res.status(201).json({
      success: true,

      data: {
        user: {
          email: user.email,
        },
      },

      error: null,
    });
  } catch (error) {
    await transaction.rollback();

    throw error;
  }
}

async function login(req, res) {
  let { email, password } = req.body;

  email = email.trim().toLowerCase();

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError("No user by this email", 401, "AuthenticationError");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 401, "AuthenticationError");
  }
  if (!user.isVerified) {
    throw new AppError("Please verify your email first.", 403, "emailVerify");
  }

  const session = await Session.create({
    userId: user.id,
    refreshTokenHash: "temporary",
    userAgent: req.headers["user-agent"] || "",
    ipAddress: req.ip,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({
    userId: user.id,
    sessionId: session.id,
  });

  session.refreshTokenHash = hashToken(refreshToken);

  await session.save();

  res.cookie("accessToken", accessToken, accessCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return res.status(200).json({
    success: true,
    data: {
      user: {
        name: user.name,
        email: user.email,
        userName: user.userName,
        role: user.role,
        phone: user.phone,
      },
    },
    error: null,
  });
}

async function refresh(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError("Refresh token missing", 401, "AuthenticationError");
  }

  const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const session = await Session.findByPk(decoded.sessionId);

  if (!session) {
    throw new AppError("Session not found", 401, "AuthenticationError");
  }

  if (hashToken(refreshToken) !== session.refreshTokenHash) {
    throw new AppError("Invalid refresh token", 401, "AuthenticationError");
  }

  const user = await User.findByPk(decoded.userId);

  if (!user) {
    throw new AppError("User not found", 401, "AuthenticationError");
  }
  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const newRefreshToken = generateRefreshToken({
    userId: user.id,
    sessionId: session.id,
  });

  session.refreshTokenHash = hashToken(newRefreshToken);

  await session.save();

  res.cookie("accessToken", accessToken, accessCookieOptions);

  res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

  return res.status(200).json({
    success: true,
    data: null,
    error: null,
  });
}
async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError("Refresh token missing", 401, "AuthenticationError");
  }

  const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  await Session.destroy({
    where: {
      id: decoded.sessionId,
    },
  });

  res.clearCookie("accessToken", accessCookieOptions);

  res.clearCookie("refreshToken", refreshCookieOptions);

  return res.status(200).json({
    success: true,
    data: null,
    error: null,
  });
}

async function verifyEmail(req, res) {
  let { email, otp } = req.body;

  email = email.trim().toLowerCase();

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found", 404, "NotFoundError");
  }

  if (user.isVerified) {
    throw new AppError("Email already verified", 400, "ValidationError");
  }

  const verification = await Verification.findOne({
    where: {
      userId: user.id,
      type: "EMAIL_VERIFICATION",
    },
  });

  if (!verification) {
    throw new AppError("Verification code not found", 400, "ValidationError");
  }

  if (verification.expiresAt < new Date()) {
    await verification.destroy();

    throw new AppError("OTP has expired", 400, "ValidationError");
  }

  if (verification.attempts >= 5) {
    throw new AppError(
      "Too many invalid OTP attempts. Please request a new OTP.",
      400,
      "ValidationError",
    );
  }
  if (verification.codeHash !== hashToken(otp)) {
    await verification.increment("attempts");

    throw new AppError("Invalid OTP", 400, "ValidationError");
  }

  user.isVerified = true;

  await user.save();

  await verification.destroy();

  return res.status(200).json({
    success: true,
    data: null,
    error: null,
  });
}

async function resendVerificationOtp(req, res) {
  let { email } = req.body;

  email = email.trim().toLowerCase();

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found", 404, "NotFoundError");
  }

  if (user.isVerified) {
    throw new AppError("Email already verified", 400, "ValidationError");
  }

  await Verification.destroy({
    where: {
      userId: user.id,
      type: "EMAIL_VERIFICATION",
    },
  });

  const otp = generateOtp();

  await Verification.create({
    userId: user.id,

    type: "EMAIL_VERIFICATION",

    codeHash: hashToken(otp),

    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendEmail({
    to: user.email,

    subject: "Verify your Email",

    htmlContent: emailVerificationTemplate(otp),
  });

  return res.status(200).json({
    success: true,
    data: null,
    error: null,
  });
}

async function changeVerificationEmail(req, res) {
  let { oldEmail, newEmail } = req.body;

  oldEmail = oldEmail.trim().toLowerCase();
  newEmail = newEmail.trim().toLowerCase();

  if (oldEmail === newEmail) {
    throw new AppError("New email must be different", 400, "ValidationError");
  }

  const user = await User.findOne({
    where: {
      email: oldEmail,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404, "NotFoundError");
  }

  if (user.isVerified) {
    throw new AppError("Email already verified", 400, "ValidationError");
  }

  const existingUser = await User.findOne({
    where: {
      email: newEmail,
    },
  });

  if (existingUser) {
    throw new AppError("Email already exists", 409, "ConflictError");
  }

  const otp = generateOtp();

  user.email = newEmail;

  await user.save();

  await Verification.destroy({
    where: {
      userId: user.id,
      type: "EMAIL_VERIFICATION",
    },
  });

  await Verification.create({
    userId: user.id,

    type: "EMAIL_VERIFICATION",

    codeHash: hashToken(otp),

    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendEmail({
    to: newEmail,

    subject: "Verify your Email",

    htmlContent: emailVerificationTemplate(otp),
  });

  return res.status(200).json({
    success: true,

    data: {
      email: newEmail,
    },

    error: null,
  });
}
async function forgotPassword(req, res) {
  let { email } = req.body;

  email = email.trim().toLowerCase();

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found", 404, "NotFoundError");
  }
  if (!user.isVerified) {
    throw new AppError(
      "Please verify your email first.",
      403,
      "AuthenticationError",
    );
  }

  const otp = generateOtp();

  await Verification.destroy({
    where: {
      userId: user.id,
      type: "PASSWORD_RESET",
    },
  });

  await Verification.create({
    userId: user.id,

    type: "PASSWORD_RESET",

    codeHash: hashToken(otp),

    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendEmail({
    to: user.email,

    subject: "Reset Password",

    htmlContent: passwordResetTemplate(otp),
  });

  return res.status(200).json({
    success: true,
    data: {
      email: user.email,
    },
    error: null,
  });
}

async function resetPassword(req, res) {
  let { email, otp, password } = req.body;

  email = email.trim().toLowerCase();

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404, "NotFoundError");
  }

  const verification = await Verification.findOne({
    where: {
      userId: user.id,
      type: "PASSWORD_RESET",
    },
  });

  if (!verification) {
    throw new AppError("Verification code not found", 400, "ValidationError");
  }

  if (verification.expiresAt < new Date()) {
    await verification.destroy();

    throw new AppError("OTP has expired", 400, "ValidationError");
  }

  if (verification.attempts >= 5) {
    await verification.destroy();

    throw new AppError(
      "Too many invalid OTP attempts. Please request a new OTP.",
      400,
      "ValidationError",
    );
  }

  if (verification.codeHash !== hashToken(otp)) {
    await verification.increment("attempts");

    throw new AppError("Invalid OTP", 400, "ValidationError");
  }

  user.password = await bcrypt.hash(password, 10);

  await user.save();

  await verification.destroy();

  await Session.destroy({
    where: {
      userId: user.id,
    },
  });

  return res.status(200).json({
    success: true,
    data: null,
    error: null,
  });
}
module.exports = {
  register,
  login,
  refresh,
  logout,
  verifyEmail,
  resendVerificationOtp,
  changeVerificationEmail,
  resetPassword,
  forgotPassword,
};
