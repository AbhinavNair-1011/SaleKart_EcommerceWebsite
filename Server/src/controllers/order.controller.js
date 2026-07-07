const { Op } = require("sequelize");
const { Order, OrderItem, Address, User } = require("../models");

const AppError = require("../utils/AppError");

async function getMyOrders(req, res) {
  const { search, page = 1, limit = 8 } = req.query;

  const currentPage = Number(page);

  const pageSize = Number(limit);

  const offset = (currentPage - 1) * pageSize;
  const { rows: orders, count: totalOrders } = await Order.findAndCountAll({
    distinct:true,
    where: {
      userId: req.user.userId,
    },

    attributes: [
      "id",
      "subtotal",
      "deliveryCharge",
      "totalAmount",
      "paymentMethod",
      "paymentStatus",
      "orderStatus",
      "createdAt",
    ],

    include: [
      {
        model: OrderItem,

        attributes: ["id", "productName", "productImage", "price", "quantity"],
      },

      {
        model: Address,

        attributes: [
          "id",
          "houseNumber",
          "area",
          "landmark",
          "city",
          "state",
          "pincode",
          "addressType",
        ],
      },
    ],

    order: [["createdAt", "DESC"]],
    limit: pageSize,

    offset,
  });

  let totalPages = Math.ceil(totalOrders / pageSize)  ;

  if (totalPages === 0) {
    totalPages = 1;
  }

  return res.status(200).json({
    success: true,
    data: {
      orders,
      pagination: {
        page: currentPage,
        limit: pageSize,
        totalOrders,
        totalPages,
      },
    },
    error: null,
  });
}

async function getOrderById(req, res) {
  const order = await Order.findOne({
    where: {
      id: req.params.id,
      userId: req.user.userId,
    },

    attributes: [
      "id",
      "subtotal",
      "deliveryCharge",
      "totalAmount",
      "paymentMethod",
      "paymentStatus",
      "orderStatus",
      "createdAt",
    ],

    include: [
      {
        model: OrderItem,

        attributes: ["id", "productName", "productImage", "price", "quantity"],
      },

      {
        model: Address,

        attributes: [
          "id",
          "houseNumber",
          "area",
          "landmark",
          "city",
          "state",
          "pincode",
          "addressType",
        ],
      },
    ],
  });

  if (!order) {
    throw new AppError("Order not found", 404, "NotFoundError");
  }

  return res.status(200).json({
    success: true,
    data: {
      order,
    },
    error: null,
  });
}

async function updateOrderStatus(req, res) {
  const order = await Order.findByPk(req.params.id);

  if (!order) {
    throw new AppError("Order not found", 404, "NotFoundError");
  }

  await order.update({
    orderStatus: req.body.orderStatus,
  });

  return res.status(200).json({
    success: true,
    data: {
      order,
    },
    error: null,
  });
}

async function cancelOrder(req, res) {
  const order = await Order.findOne({
    where: {
      id: req.params.id,
      userId: req.user.userId,
    },
  });

  if (!order) {
    throw new AppError("Order not found", 404, "NotFoundError");
  }

  if (order.orderStatus !== "pending") {
    throw new AppError(
      "Only pending orders can be cancelled",
      400,
      "ValidationError",
    );
  }

  await order.update({
    orderStatus: "cancelled",
  });

  return res.status(200).json({
    success: true,
    data: {
      order,
    },
    error: null,
  });
}

async function getAllOrders(req, res) {
  const { search, page = 1, limit = 8 } = req.query;

  const currentPage = Number(page);

  const pageSize = Number(limit);

  const offset = (currentPage - 1) * pageSize;

  const userWhere = {};

  if (search) {
    userWhere.email = {
      [Op.like]: `%${search}%`,
    };
  }

  const { rows: orders, count: totalOrders } = await Order.findAndCountAll({
    distinct:true,
    attributes: [
      "id",
      "subtotal",
      "deliveryCharge",
      "totalAmount",
      "paymentMethod",
      "paymentStatus",
      "orderStatus",
      "createdAt",
    ],

    include: [
      {
        model: User,

        where: search ? userWhere : undefined,

        attributes: ["id", "name", "email"],
      },

      {
        model: Address,

        attributes: [
          "houseNumber",
          "area",
          "landmark",
          "city",
          "state",
          "pincode",
          "addressType",
        ],
      },

      {
        model: OrderItem,

        attributes: ["productName", "productImage", "price", "quantity"],
      },
    ],

    order: [["createdAt", "DESC"]],

    limit: pageSize,

    offset,
  });
  console.log(totalOrders);
  let totalPages = Math.ceil(totalOrders / pageSize) ;

  if (totalPages === 0) {
    totalPages = 1;
  }

  return res.status(200).json({
    success: true,

    data: {
      orders,

      pagination: {
        page: currentPage,

        limit: pageSize,

        totalOrders,

        totalPages,
      },
    },

    error: null,
  });
}
async function getOrderByIdForAdmin(req, res) {
  const order = await Order.findByPk(req.params.id, {
    attributes: [
      "id",
      "subtotal",
      "deliveryCharge",
      "totalAmount",
      "paymentMethod",
      "paymentStatus",
      "orderStatus",
      "createdAt",
    ],

    include: [
      {
        model: User,

        attributes: ["name", "email", "phone"],
      },

      {
        model: Address,

        attributes: [
          "houseNumber",
          "area",
          "landmark",
          "city",
          "state",
          "pincode",
          "addressType",
        ],
      },

      {
        model: OrderItem,

        attributes: ["productName", "productImage", "price", "quantity"],
      },
    ],
  });

  if (!order) {
    throw new AppError("Order not found", 404, "NotFoundError");
  }

  return res.status(200).json({
    success: true,
    data: {
      order,
    },
    error: null,
  });
}

module.exports = {
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getOrderByIdForAdmin,
};
