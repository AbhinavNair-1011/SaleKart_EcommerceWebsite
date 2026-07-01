

const User = require("./user.model");
const Session = require("./session.model");
const Category = require("./category.model");
const Product = require("./product.model");

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

module.exports = {
  User,
  Session,
  Category,
  Product,
};