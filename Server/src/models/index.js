const User = require("./user.model");
const Session = require("./session.model");
const Category = require("./category.model");
const Product = require("./product.model");

const Address = require("./address.model");

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

module.exports = {
  User,
  Session,
  Category,
  Product,
  Address,
};
