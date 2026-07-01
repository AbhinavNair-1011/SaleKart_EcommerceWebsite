const { Address } = require("../models");

const AppError = require("../utils/AppError");

async function createAddress(req, res) {
  const address = await Address.create({
    ...req.body,
    userId: req.user.userId,
  });

  return res.status(201).json({
    success: true,
    data: {
      address,
    },
    error: null,
  });
}

async function getAddresses(req, res) {
  const addresses = await Address.findAll({
    where: {
      userId: req.user.userId,
    },

    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({
    success: true,
    data: {
      addresses,
    },
    error: null,
  });
}

async function updateAddress(req, res) {
  const address = await Address.findOne({
    where: {
      id: req.params.id,
      userId: req.user.userId,
    },
  });

  if (!address) {
    throw new AppError("Address not found", 404, "NotFoundError");
  }

  await address.update(req.body);

  return res.status(200).json({
    success: true,
    data: {
      address,
    },
    error: null,
  });
}

async function deleteAddress(req, res) {
  const address = await Address.findOne({
    where: {
      id: req.params.id,
      userId: req.user.userId,
    },
  });

  if (!address) {
    throw new AppError("Address not found", 404, "NotFoundError");
  }

  await address.destroy();

  return res.status(200).json({
    success: true,
    data: null,
    error: null,
  });
}

module.exports = {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
};
