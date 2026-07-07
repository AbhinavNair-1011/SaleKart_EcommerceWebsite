const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const validate = require("../middlewares/validate");

const { uuidParamSchema } = require("../validators/uuid.validation");

const { updateOrderStatusSchema, getAllOrdersSchema } = require("../validators/order.validation");

const {
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
  getOrderByIdForAdmin,
} = require("../controllers/order.controller");

router.get("/", authMiddleware, getMyOrders);

router.get("/all", authMiddleware,authorize("admin") ,validate(getAllOrdersSchema , "query"), getAllOrders);

router.get(
  "/admin/:id",
  authMiddleware,
  authorize("admin"),
  validate(uuidParamSchema, "params"),
  getOrderByIdForAdmin,
);
router.get(
  "/:id",
  authMiddleware,
  validate(uuidParamSchema, "params"),
  getOrderById,
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validate(uuidParamSchema, "params"),
  validate(updateOrderStatusSchema),
  updateOrderStatus,
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  validate(uuidParamSchema, "params"),
  cancelOrder,
);

module.exports = router;
