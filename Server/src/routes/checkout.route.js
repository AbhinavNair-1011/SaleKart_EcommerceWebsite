const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const validate = require("../middlewares/validate");

const { checkoutSchema } = require("../validators/checkout.validation");

const {
  checkoutCOD,
  checkoutRazorpay,
} = require("../controllers/checkout.controller");


router.post("/cod",authMiddleware, validate(checkoutSchema), checkoutCOD);

router.post("/razorpay",authMiddleware, validate(checkoutSchema), checkoutRazorpay);

module.exports = router;
