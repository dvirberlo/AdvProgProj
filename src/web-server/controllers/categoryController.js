const categoryService = require("../services/categoryService");
const { verifyToken } = require("../services/tokenService");
const { TOKEN_ID_HEADER } = require("../constants/httpHeaders");
const { UserRoles } = require("../models/userRolesModel");

const createCategory = async (req, res) => {
  let category;
  try {
    const user = await verifyToken(req.headers[TOKEN_ID_HEADER]);
    if (!user || user.role !== UserRoles.Admin)
      return res.status(401).json({ error: "Unauthorized" });

    category = await categoryService.createCategory(
      req.body.name,
      req.body.promoted
    );
  } catch (error) {
    if (error.message === "This category already exists") {
      return res.status(409).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }
  return res.status(201).json(category);
};
const getCategories = async (req, res) => {
  try {
    const user = await verifyToken(req.headers[TOKEN_ID_HEADER]);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    res.status(200).json(await categoryService.getCategories());
  } catch (error) {
    console.error("categoryController: getCategories internal error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const user = await verifyToken(req.headers[TOKEN_ID_HEADER]);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "category not found" });
    } else {
      return res.json(category);
    }
  } catch (error) {
    console.error("categoryController: getCategoryById internal error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateCategory = async (req, res) => {
  let category;
  try {
    const user = await verifyToken(req.headers[TOKEN_ID_HEADER]);
    if (!user || user.role !== UserRoles.Admin)
      return res.status(401).json({ error: "Unauthorized" });

    // Call the service with only the fields that might be updated
    category = await categoryService.updateCategory(req.params.id, {
      name: req.body.name,
      promoted: req.body.promoted,
    });
  } catch (error) {
    if (error.message === "This category already exists") {
      return res.status(409).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  return res.status(204).end();
};
const deleteCategory = async (req, res) => {
  try {
    const user = await verifyToken(req.headers[TOKEN_ID_HEADER]);
    if (!user || user.role !== UserRoles.Admin)
      return res.status(401).json({ error: "Unauthorized" });

    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }
    return res.status(204).json({}); // return empty response
  } catch (error) {
    console.error("categoryController: deleteCategory internal error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
