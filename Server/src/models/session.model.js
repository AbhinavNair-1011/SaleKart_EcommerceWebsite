const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Session = sequelize.define(
  "Session",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    refreshTokenHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userAgent: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    ipAddress: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "sessions",
    timestamps: true,
  }
);

module.exports = Session;