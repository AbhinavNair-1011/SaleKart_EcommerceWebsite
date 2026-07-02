const { User, Category, Product, Order } = require("../models");

async function getDashboard(req, res) {
  const [
    totalUsers,
    totalCategories,
    totalProducts,
    totalOrders,
    revenue,
    recentOrders,
  ] = await Promise.all([
    User.count(),

    Category.count(),

    Product.count(),

    Order.count(),

    Order.sum("totalAmount", {
      where: {
        paymentStatus: "paid",
      },
    }),

    Order.findAll({
      limit: 5,

      order: [["createdAt", "DESC"]],

      attributes: [
        "id",
        "totalAmount",
        "paymentMethod",
        "paymentStatus",
        "orderStatus",
        "createdAt",
      ],

      include: {
        model: User,

        attributes: ["name", "email"],
      },
    }),
  ]);

  return res.status(200).json({
    success: true,

    data: {
      totalUsers,
      totalCategories,
      totalProducts,
      totalOrders,
      revenue: revenue ?? 0,
      recentOrders,
    },

    error: null,
  });
}


module.exports={getDashboard}