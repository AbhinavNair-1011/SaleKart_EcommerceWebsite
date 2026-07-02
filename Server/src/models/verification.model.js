const { DataTypes } = require("sequelize");

const { sequelize } = require("../config/db");

const Verification = sequelize.define(
  "Verification",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    type: {
      type: DataTypes.ENUM(
        "EMAIL_VERIFICATION",
        "PASSWORD_RESET",
      ),
      allowNull: false,
    },

    codeHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },

  {
    tableName: "verifications",

    timestamps: true,
  },
);

module.exports = Verification;