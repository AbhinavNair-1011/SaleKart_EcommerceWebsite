const { Cart, Product } = require("../models");

const AppError = require("../utils/AppError");

async function addToCart(req, res) {
  const { productId, quantity } = req.body;

  const product = await Product.findByPk(productId);

  if (!product) {
    throw new AppError(
      "Product not found",
      404,
      "NotFoundError"
    );
  }

  if (product.stock <= 0) {
    throw new AppError(
      "Product is out of stock",
      400,
      "ValidationError"
    );
  }

  let cartItem = await Cart.findOne({
    where: {
      userId: req.user.userId,
      productId,
    },
  });

  if (cartItem) {
    const updatedQuantity =
      cartItem.quantity + quantity;

    if (updatedQuantity > product.stock) {
      throw new AppError(
        "Not enough stock available",
        400,
        "ValidationError"
      );
    }

    await cartItem.update({
      quantity: updatedQuantity,
    });
  } else {
    if (quantity > product.stock) {
      throw new AppError(
        "Not enough stock available",
        400,
        "ValidationError"
      );
    }

    cartItem = await Cart.create({
      userId: req.user.userId,
      productId,
      quantity,
    });
  }

  return res.status(201).json({
    success: true,
    data: {
      cartItem,
    },
    error: null,
  });
}

async function getCart(req, res) {
  const cart = await Cart.findAll({
    where: {
      userId: req.user.userId,
    },

    include: {
      model: Product,
    },

    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({
    success: true,
    data: {
      cart,
    },
    error: null,
  });
}

async function updateCart(req, res) {
  const cartItem = await Cart.findOne({
    where: {
      id: req.params.id,
      userId: req.user.userId,
    },

    include: Product,
  });

  if (!cartItem) {
    throw new AppError(
      "Cart item not found",
      404,
      "NotFoundError"
    );
  }

  if (
    req.body.quantity >
    cartItem.Product.stock
  ) {
    throw new AppError(
      "Not enough stock available",
      400,
      "ValidationError"
    );
  }

  await cartItem.update({
    quantity: req.body.quantity,
  });

  return res.status(200).json({
    success: true,
    data: {
      cartItem,
    },
    error: null,
  });
}

async function removeFromCart(req, res) {
  const cartItem = await Cart.findOne({
    where: {
      id: req.params.id,
      userId: req.user.userId,
    },
  });

  if (!cartItem) {
    throw new AppError(
      "Cart item not found",
      404,
      "NotFoundError"
    );
  }

  await cartItem.destroy();

  return res.status(200).json({
    success: true,
    data: null,
    error: null,
  });
}

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};