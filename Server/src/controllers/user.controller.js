const { User } = require("../models");
const AppError = require("../utils/AppError");

async function getMyProfile(req, res) {
  const user = await User.findByPk(req.user.userId, {
    attributes: ["name", "email", "userName", "phone", "role"],
  });

  if (!user) {
    throw new AppError("User not found", 404, "NotFoundError");
  }

  return res.status(200).json({
    success: true,
    data: {
      user,
    },
    error: null,
  });
}
async function updateMyProfile(req, res) {
  const user = await User.findByPk(req.user.userId);

  if (!user) {
    throw new AppError("User not found", 404, "NotFoundError");
  }

  await user.update(req.body);

  return res.status(200).json({
    success: true,
    data: {
      user: {
        name: user.name,
        email: user.email,
        userName: user.userName,
        phone: user.phone,
        role: user.role,
      },
    },
    error: null,
  });
}
module.exports = {
  getMyProfile,
  updateMyProfile,
};
