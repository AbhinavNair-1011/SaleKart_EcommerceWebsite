const crypto = require("crypto");

const {
  Cart,
  Product,
  Address,
  Order,
  OrderItem,
} = require("../models");
const {sequelize} = require("../config/db")


const AppError = require("../utils/AppError");

async function verifyPayment(req, res) {

  console.log(req.body)
  const {    addressId,    razorpay_order_id,    razorpay_payment_id,
    razorpay_signature  } = req.body;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new AppError("Payment verification failed", 400, "ValidationError");
  }

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
        paymentMethod: "razorpay",

        paymentStatus: "paid",
        orderStatus: "pending",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,

        razorpaySignature: razorpay_signature,
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

module.exports = {
  verifyPayment,
};
