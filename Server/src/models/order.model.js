const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    deliveryCharge: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    paymentMethod: {
      type: DataTypes.ENUM("cod", "razorpay"),
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },

    orderStatus: {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  },
);

module.exports = Order;
