const { Op } = require("sequelize");
const { Category } = require("../models");
const AppError = require("../utils/AppError");

async function createCategory(req, res) {
  let { name } = req.body;

  name = name.trim();

  const existingCategory = await Category.findOne({
    where: { name },
  });

  if (existingCategory) {
    throw new AppError("Category already exists", 409, "ConflictError");
  }

  const category = await Category.create({
    name,
  });

  return res.status(201).json({
    success: true,
    data: {
      category,
    },
    error: null,
  });
}

async function getAllCategories(req, res) {
  const { page = 1, limit = 8, sortBy, order, search } = req.query;

  console.log(req.query)
  const where = {};

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  const currentPage = Number(page);

  const pageSize = Number(limit);

  let offset = pageSize * (currentPage - 1);

  const { rows: categories, count: totalCategories } =
    await Category.findAndCountAll({
      where,
      order: [["name", "ASC"]],
      limit: pageSize,
      offset,
    });

  let totalPages = Math.ceil(totalCategories / pageSize);
  if (totalPages === 0) {
    totalPages = 1;
  }
  return res.status(200).json({
    success: true,
    data: {
      categories,
      pagination: {
        page: currentPage,

        limit: pageSize,

        totalCategories,

        totalPages,
      },
    },
    error: null,
  });
}

async function getCategoryById(req, res) {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError("Category not found", 404, "NotFoundError");
  }

  return res.status(200).json({
    success: true,
    data: {
      category,
    },
    error: null,
  });
}

async function updateCategory(req, res) {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError("Category not found", 404, "NotFoundError");
  }

  if (req.body.name) {
    const existingCategory = await Category.findOne({
      where: {
        name: req.body.name.trim(),
      },
    });

    if (existingCategory && existingCategory.id !== id) {
      throw new AppError("Category already exists", 409, "ConflictError");
    }
  }

  await category.update({
    name: req.body.name?.trim() ?? category.name,
  });

  return res.status(200).json({
    success: true,
    data: {
      category,
    },
    error: null,
  });
}

async function deleteCategory(req, res) {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError("Category not found", 404, "NotFoundError");
  }

  await category.destroy();

  return res.status(200).json({
    success: true,
    data: null,
    error: null,
  });
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
