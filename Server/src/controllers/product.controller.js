const { Product, Category } = require("../models");
const AppError = require("../utils/AppError");

async function createProduct(req, res) {
  const { name, description, price, stock, imageUrl, categoryId } = req.body;

  const category = await Category.findByPk(categoryId);

  if (!category) {
    throw new AppError("Category not found", 404, "NotFoundError");
  }

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    imageUrl,
    categoryId,
  });

  return res.status(201).json({
    success: true,
    data: {
      product,
    },
    error: null,
  });
}

async function getAllProducts(req, res) {
  const products = await Product.findAll({
    include: {
      model: Category,
      attributes: ["id", "name"],
    },

    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({
    success: true,
    data: {
      products,
    },
    error: null,
  });
}

async function getProductById(req, res) {
  const { id } = req.params;

  const product = await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: ["id", "name"],
    },
  });

  if (!product) {
    throw new AppError("Product not found", 404, "NotFoundError");
  }

  return res.status(200).json({
    success: true,
    data: {
      product,
    },
    error: null,
  });
}

async function updateProduct(req, res) {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    throw new AppError("Product not found", 404, "NotFoundError");
  }

  if (req.body.categoryId) {
    const category = await Category.findByPk(req.body.categoryId);

    if (!category) {
      throw new AppError("Category not found", 404, "NotFoundError");
    }
  }

  await product.update(req.body);

  return res.status(200).json({
    success: true,
    data: {
      product,
    },
    error: null,
  });
}

async function deleteProduct(req, res) {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    throw new AppError("Product not found", 404, "NotFoundError");
  }

  await product.destroy();

  return res.status(200).json({
    success: true,
    data: null,
    error: null,
  });
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
