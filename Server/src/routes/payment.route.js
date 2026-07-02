const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const validate = require("../middlewares/validate");

const { verifyPaymentSchema } = require("../validators/payment.validation");

const { verifyPayment } = require("../controllers/payment.controller");


router.post("/verify", authMiddleware,validate(verifyPaymentSchema), verifyPayment);

module.exports = router;
