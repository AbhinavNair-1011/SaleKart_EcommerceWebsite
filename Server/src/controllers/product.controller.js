const { Product, Category } = require("../models");
const AppError = require("../utils/AppError");
const { Op } = require("sequelize");
const uploadToS3 = require("../utils/uploadToS3");

async function createProduct(req, res) {
  const { name, description, price, stock, categoryId } = req.body;

  if (!req.file) {
    throw new AppError("Product image required", 400, "ValidationError");
  }

  const category = await Category.findByPk(categoryId);

  if (!category) {
    throw new AppError("Category not found", 404, "NotFoundError");
  }

  const imageUrl = await uploadToS3(req.file);

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    categoryId,
    imageUrl,
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
  const { search, categoryId, page = 1, limit = 8 } = req.query;
  const where = {};

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const currentPage = Number(page);

  const pageSize = Number(limit);

  const offset = (currentPage - 1) * pageSize;

  const { rows: products, count: totalProducts } =
    await Product.findAndCountAll({
      distinct:true,
      where,

      include: {
        model: Category,
        attributes: ["id", "name"],
      },

      order: [["createdAt", "DESC"]],

      limit: pageSize,

      offset,
    });

  let totalPages = Math.ceil(totalProducts / pageSize);
  if (totalPages === 0) {
    totalPages = 1;
  }
  return res.status(200).json({
    success: true,

    data: {
      products,

      pagination: {
        page: currentPage,

        limit: pageSize,

        totalProducts,

        totalPages,
      },
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

  let imageUrl = product.imageUrl;

  if (req.file) {
    imageUrl = await uploadToS3(req.file);
  }

  await product.update({
    ...req.body,
    imageUrl,
  });

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
