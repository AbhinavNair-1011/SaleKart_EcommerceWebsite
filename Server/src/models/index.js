const User = require("./user.model");
const Session = require("./session.model");
const Category = require("./category.model");
const Product = require("./product.model");

const Address = require("./address.model");
const Cart = require("./cart.model");

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

module.exports = {
  User,
  Session,
  Category,
  Product,
  Address,
  Cart,
};
