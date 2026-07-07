const {
  Cart,
  Product,
  Address,
  Order,
  OrderItem,
} = require("../models");

const {sequelize} = require("../config/db")
const AppError = require("../utils/AppError");
const razorpay = require("../config/razorpay");

async function checkoutCOD(req, res) {
  const { addressId } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const cartItems = await Cart.findAll({
      where: {
        userId: req.user.userId,
      },
      include: Product,
      transaction,
    });

    if (cartItems.length === 0) {
      throw new AppError("Cart is empty", 400, "ValidationError");
    }

    const address = await Address.findOne({
      where: {
        id: addressId,
        userId: req.user.userId,
      },
      transaction,
    });

    if (!address) {
      throw new AppError("Address not found", 404, "NotFoundError");
    }

    let subtotal = 0;

    for (const item of cartItems) {
      if (!item.Product) {
        throw new AppError("Product not found", 404, "NotFoundError");
      }

      if (item.quantity > item.Product.stock) {
        throw new AppError(
          `${item.Product.name} is out of stock`,
          400,
          "ValidationError",
        );
      }

      subtotal += Number(item.Product.price) * item.quantity;
    }

    const deliveryCharge = 0;

    const totalAmount = subtotal + deliveryCharge;

    const order = await Order.create(
      {
        userId: req.user.userId,
        addressId,
        subtotal,
        deliveryCharge,
        totalAmount,
        paymentMethod: "cod",
        paymentStatus: "pending",
        orderStatus: "pending",
      },
      {
        transaction,
      },
    );

    for (const item of cartItems) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.Product.id,
          productName: item.Product.name,
          productImage: item.Product.imageUrl,
          quantity: item.quantity,
          price: item.Product.price,
        },
        {
          transaction,
        },
      );

      await item.Product.update(
        {
          stock: item.Product.stock - item.quantity,
        },
        {
          transaction,
        },
      );
    }

    await Cart.destroy({
      where: {
        userId: req.user.userId,
      },
      transaction,
    });

    await transaction.commit();

    return res.status(201).json({
      success: true,
      data: {
        order,
      },
      error: null,
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function checkoutRazorpay(req, res) {
  const { addressId } = req.body;

  const cartItems = await Cart.findAll({
    where: {
      userId: req.user.userId,
    },

    include: Product,
  });

  if (cartItems.length === 0) {
    throw new AppError("Cart is empty", 400, "ValidationError");
  }

  const address = await Address.findOne({
    where: {
      id: addressId,
      userId: req.user.userId,
    },
  });

  if (!address) {
    throw new AppError("Address not found", 404, "NotFoundError");
  }

  let subtotal = 0;

  for (const item of cartItems) {
    if (!item.Product) {
      throw new AppError("Product not found", 404, "NotFoundError");
    }

    if (item.quantity > item.Product.stock) {
      throw new AppError(
        `${item.Product.name} is out of stock`,
        400,
        "ValidationError",
      );
    }

    subtotal += Number(item.Product.price) * item.quantity;
  }

  const deliveryCharge = 0;

  const totalAmount = subtotal + deliveryCharge;

  const razorpayOrder = await razorpay.orders.create({
    amount: totalAmount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return res.status(200).json({
    success: true,
    data: {
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      addressId,
    },
    error: null,
  });
}

module.exports = {
  checkoutCOD,
  checkoutRazorpay,
};
