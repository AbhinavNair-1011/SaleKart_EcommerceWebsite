const express = require("express");

const router = express.Router();
const { uuidParamSchema } = require("../validators/uuid.validation");

const authMiddleware = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const validate = require("../middlewares/validate");

const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validators/category.validation");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validate(createCategorySchema),
  createCategory,
);

router.get("/", getAllCategories);

router.get("/:id", validate(uuidParamSchema, "params"), getCategoryById);

router.patch("/:id",authMiddleware,authorize("admin"),
  validate(uuidParamSchema, "params"),
  validate(updateCategorySchema),
  updateCategory,
);

router.delete("/:id", authMiddleware, authorize("admin"),
  validate(uuidParamSchema, "params"),
  deleteCategory,
);

module.exports = router;
