const app = require("./app");

const { connectDb, sequelize } = require("./config/db");

const PORT = process.env.PORT || 4000;


async function startServer() {

  await connectDb();
await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
