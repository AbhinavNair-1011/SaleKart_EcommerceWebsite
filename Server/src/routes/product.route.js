const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const validate = require("../middlewares/validate");

const { uuidParamSchema } = require("../validators/uuid.validation");

const {
  createProductSchema,
  updateProductSchema,
  getProductsQuerySchema,
} = require("../validators/product.validation");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const upload = require("../middlewares/upload");


router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  upload.single("image"),
  validate(createProductSchema),
  createProduct,
);

router.get("/", validate(getProductsQuerySchema, "query"), getAllProducts);

router.get("/:id", validate(uuidParamSchema, "params"), getProductById);


router.patch(
  "/:id",
  authMiddleware,
  authorize("admin"),
  upload.single("image"),
  validate(uuidParamSchema, "params"),
  validate(updateProductSchema),
  updateProduct,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validate(uuidParamSchema, "params"),
  deleteProduct,
);

module.exports = router;
