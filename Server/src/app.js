const express = require("express");
require("dotenv").config()
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

require("./models")

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/product.route");
const addressRoutes = require("./routes/address.route");
const cartRoutes = require("./routes/cart.route");

const globalErrorHandler = require("./middlewares/globalErrorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/api/check", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running successfully",
  });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/addresses", addressRoutes);
app.use("/cart", cartRoutes);

app.use(notFoundHandler);

app.use(globalErrorHandler);


module.exports=app








