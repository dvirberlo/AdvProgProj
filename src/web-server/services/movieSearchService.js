const mongoose = require("mongoose");
const Movie = require("../models/movieModel");
const Category = require("../models/categoryModel");

/**
 * @param {String?} query
 * @return movies that has a field that match the specified query
 */
const searchMovies = async (query) => {
  const matches = [];
  // create case insensitive regular expression for query
  const regex = new RegExp(query, "i");

  if (typeof query === "string") {
    matches.push(...(await Movie.find({ name: { $regex: regex } })));

    const categories = await Category.find({ name: { $regex: regex } });
    const categoriesIds = categories.map((category) => category._id);
    if (categoriesIds.length > 0)
      matches.push(
        ...(await Movie.find({ categories: { $in: categoriesIds } }))
      );
  }
  if (!isNaN(new Date(query))) {
    matches.push(...(await Movie.find({ date: query })));
  }
  // return without duplicates
  return Array.from(new Map(matches.map((item) => [item.id, item])).values());
};

module.exports = {
  searchMovies,
};
