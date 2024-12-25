const categoryService = require("../services/categoryService");
const createCategory = async (req, res) => {
  let category;
  try {
    category = await categoryService.createCategory(
      req.body.name,
      req.body.promoted
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(201).json(category);
};
const getCategories = async (req, res) => {
  res.json.status(200)(await categoryService.getCategories());
};
const getCategoryById = async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  if (!category) {
    return res.status(404).json({ error: "category not found" });
  }
  return res.json(category);
};
const updateCategory = async (req, res) => {
  let category;
  try {
    category = await categoryService.updateCategory(
      req.body.name,
      req.body.promoted,
      req.params.id
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!category) {
    return res.status(404).json({ error: "category not found" });
  }
  return res.status(204).json({}); // return empty response
};
const deleteCategory = async (req, res) => {
  const category = await categoryService.deleteCategory(req.params.id);
  if (!category) {
    return res.status(404).json({ error: "category not found" });
  }
  return res.status(204).json({}); // return empty response
};
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
