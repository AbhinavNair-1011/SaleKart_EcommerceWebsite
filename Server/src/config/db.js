const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
   
  }
);

async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
}

module.exports = { sequelize, connectDb };