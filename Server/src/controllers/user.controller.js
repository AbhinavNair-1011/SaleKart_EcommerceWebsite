const { User } = require("../models");
const AppError = require("../utils/AppError");
const { Op } = require("sequelize");

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
  console.log(req.body);

  const user = await User.findByPk(req.user.userId);

  if (!user) {
    throw new AppError("User not found", 404, "NotFoundError");
  }

  if (req.body.userName) {
    const existingUser = await User.findOne({
      where: {
        userName: req.body.userName,
        id: {
          [Op.ne]: req.user.userId,
        },
      },
    });

    if (existingUser) {
      throw new AppError("Username already exists", 409, "ConflictError");
    }
  }

  await user.update(req.body);

  console.log(user);
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
