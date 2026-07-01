const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    houseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    landmark: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    addressType: {
      type: DataTypes.ENUM("home", "work", "other"),
      allowNull: false,
      defaultValue: "home",
    },
  },
  {
    tableName: "addresses",
    timestamps: true,
  },
);

module.exports = Address;
