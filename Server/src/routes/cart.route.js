const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const validate = require("../middlewares/validate");

const {
  createCartSchema,
  updateCartSchema,
} = require("../validators/cart.validation");

const { uuidParamSchema } = require("../validators/uuid.validation");

const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cart.controller");

router.use(authMiddleware);     

router.post("/", validate(createCartSchema), addToCart);

router.get("/", getCart);

router.patch(
  "/:id",
  validate(uuidParamSchema, "params"),
  validate(updateCartSchema),
  updateCart,
);

router.delete("/:id", validate(uuidParamSchema, "params"), removeFromCart);

module.exports = router;
