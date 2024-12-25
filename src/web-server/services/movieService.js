const Movie = require("../models/movieModel");
// Define the error code for duplicate key
let ERROR_DUP_KEY = 11000;
const createMovie = async (name, categories) => {
  try {
    movie = await Movie.create({
      name: name,
      categories: categories,
      legacyId: await getUniqueLegacyId(),
    });
  } catch (error) {
    if (error.code === ERROR_DUP_KEY) {
      throw new Error("This movie already exists");
    } else {
      throw new Error("Error creating category: " + error.message);
    }
  }
  return await movie.save();
};
const getUniqueLegacyId = async () => {
    let legacyId;
    do {
      legacyId = getRandomInt32();
    } while ((await User.findOne({ legacyId: legacyId })) != null);
    return legacyId;
  };
const getCategoryById = async (id) => {
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
  console.log(category);
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
    console.log(updatedCategory);
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
