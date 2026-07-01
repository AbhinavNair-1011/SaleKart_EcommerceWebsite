const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const validate = require("../middlewares/validate");

const { uuidParamSchema } = require("../validators/uuid.validation");

const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/product.validation");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validate(createProductSchema),
  createProduct,
);

router.get("/", getAllProducts);

router.get("/:id", validate(uuidParamSchema, "params"), getProductById);

router.patch("/:id",authMiddleware,authorize("admin"), validate(uuidParamSchema, "params"),
  validate(updateProductSchema),
  updateProduct,
);

router.delete("/:id",authMiddleware, authorize("admin"),validate(uuidParamSchema, "params"),
  deleteProduct,
);

module.exports = router;
