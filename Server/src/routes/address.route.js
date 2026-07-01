const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const validate = require("../middlewares/validate");

const { uuidParamSchema } = require("../validators/uuid.validation");

const {
  createAddressSchema,
  updateAddressSchema,
} = require("../validators/address.validation");

const {
  createAddress, getAddresses, updateAddress, deleteAddress,} = require("../controllers/address.controller");

router.use(authMiddleware);

router.post("/", validate(createAddressSchema), createAddress);

router.get("/", getAddresses);

router.patch(
  "/:id",
  validate(uuidParamSchema, "params"),
  validate(updateAddressSchema),
  updateAddress,
);

router.delete("/:id", validate(uuidParamSchema, "params"), deleteAddress);

module.exports = router;
