const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
// Define the error code for duplicate key
let ERROR_DUP_KEY = 11000;
const createCategory = async (name, promoted) => {
  let category;
  try {
    category = await Category.create({ name: name, promoted: promoted });
  } catch (error) {
    if (error.code === ERROR_DUP_KEY) {
      throw new Error("This category already exists");
    } else {
      throw new Error("Error creating category: " + error.message);
    }
  }
  return await category.save();
};
const getCategoryById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const category = await Category.findById(id);
  if (!category) {
    return null;
  }
  return category;
};
const getCategories = async () => {
  return await Category.find({});
};

const updateCategory = async (name, promoted, id) => {
  const category = await getCategoryById(id); // Retrieve the category by ID
  if (!category) {
    // If no category is found, you might want to handle this case, e.g., return null or throw an error
    return null; // Or throw new Error('Category not found');
  }

  // Update the properties
  category.name = name;
  category.promoted = promoted;

  // Save the updated category
  try {
    const updatedCategory = await category.save();
    return updatedCategory;
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
};
const deleteCategory = async (id) => {
  const category = await getCategoryById(id);
  if (!category) {
    return null;
  }
  await category.deleteOne({ _id: id });
  return category;
};

module.exports = {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
};
