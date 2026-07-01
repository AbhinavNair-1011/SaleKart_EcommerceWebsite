const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { uuidv4 } = require("zod");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    userId:{
        type:DataTypes.UUID,
        allowNull:false
    }
  },
  {
    tableName: "cart",
    timestamps: true,
  }
);

module.exports = Cart;