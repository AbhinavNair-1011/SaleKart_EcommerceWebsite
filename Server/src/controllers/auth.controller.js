const bcrypt = require("bcryptjs");

const { User, Session } = require("../models");

const AppError = require("../utils/AppError");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/jwt.js");

const hashToken = require("../utils/hashToken");
const {
  accessCookieOptions,
  refreshCookieOptions,
} = require("../shared/cookieOptions");

async function register(req, res) {
  let { name, email, password, userName } = req.body;

  email = email.trim().toLowerCase();
  userName = userName.trim().toLowerCase();

  const existingEmail = await User.findOne({
    where: { email },
  });

  if (existingEmail) {
    throw new AppError("Email already exists", 409, "ConflictError");
  }

  const existingUsername = await User.findOne({
    where: { userName },
  });

  if (existingUsername) {
    throw new AppError("Username already exists", 409, "ConflictError");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    userName,
    role: "user",
  });

  return res.status(201).json({
    success: true,
    data: {
      user: {
        name: user.name,
        email: user.email,
        userName: user.userName,
        role: user.role,
      },
    },
    error: null,
  });
}

async function login(req, res) {
  let { email, password } = req.body;

  email = email.trim().toLowerCase();

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401, "AuthenticationError");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 401, "AuthenticationError");
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

  res.cookie("accessToken", accessToken,accessCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return res.status(200).json({
    success: true,
    data: {
      user: {
        name: user.name,
        email: user.email,
        userName: user.userName,
        role: user.role,
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


module.exports = {
  register,
  login,
  refresh,
  logout,
};
