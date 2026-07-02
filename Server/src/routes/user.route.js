const express = require("express");
const authMiddleware = require("../middlewares/auth");

const validate = require("../middlewares/validate");

const { updateProfileSchema } = require("../validators/user.validation");

const {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
} = require("../controllers/user.controller");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);

router.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  updateMyProfile,
);

router.get("/all", authMiddleware, authorize("admin"), getAllUsers);
module.exports = router;
