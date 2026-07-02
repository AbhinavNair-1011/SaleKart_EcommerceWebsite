const User = require("./user.model");
const Session = require("./session.model");
const Category = require("./category.model");
const Product = require("./product.model");

const Address = require("./address.model");
const Cart = require("./cart.model");
const Order = require("./order.model");
const OrderItem = require("./orderItem.model");
const Verification = require("./verification.model");

User.hasMany(Address, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Address.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Session, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Session.belongsTo(User, {
  foreignKey: "userId",
});

Category.hasMany(Product, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
});

User.hasMany(Cart, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Cart.belongsTo(User, {
  foreignKey: "userId",
});

Product.hasMany(Cart, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

Cart.belongsTo(Product, {
  foreignKey: "productId",
});

User.hasMany(Order, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Order.belongsTo(User, {
  foreignKey: "userId",
});

Address.hasMany(Order, {
  foreignKey: "addressId",
});

Order.belongsTo(Address, {
  foreignKey: "addressId",
});

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  onDelete: "CASCADE",
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
});

Product.hasMany(OrderItem, {
  foreignKey: "productId",
});

OrderItem.belongsTo(Product, {
  foreignKey: "productId",
});

User.hasMany(Verification, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Verification.belongsTo(User, {
  foreignKey: "userId",
});
module.exports = {
  User,
  Session,
  Category,
  Product,
  Address,
  Cart,
  Order,
  OrderItem,
  Verification
};
