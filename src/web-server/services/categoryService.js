const mongoose = require("mongoose");
const { Category } = require('../models/categoryModel');
const Movie = require("../services/movieService");
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
  if (!mongoose.isValidObjectId(id)) {
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

const updateCategory = async (id, updates) => {
  // Retrieve the category by ID
  const category = await getCategoryById(id);
  if (!category) {
    return null;
  }

  // Update only provided fields
  // (Check for undefined to avoid overwriting with empty if field wasn't sent)
  if (typeof updates.name !== "undefined") {
    category.name = updates.name;
  }
  if (typeof updates.promoted !== "undefined") {
    category.promoted = updates.promoted;
  }

  // Save the updated category
  try {
    const updatedCategory = await category.save();
    return updatedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteCategory = async (id) => {
  const category = await getCategoryById(id);
  if (!category) {
    return null;
  }
  await category.deleteOne({ _id: id });
  // returned value should be all the movies involved
  const indicator = Movie.deleteCategory(id);
  if (indicator === false) {
    return null;
  } else {
    return category;
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
};
