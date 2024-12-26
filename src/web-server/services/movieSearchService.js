const mongoose = require("mongoose");
const Movie = require("../models/movieModel");
const Category = require("../models/categoryModel");

/**
 * @param {String?} query
 * @return movies that has a field that match the specified query
 */
const searchMovies = async (query) => {
  const matches = [];
  if (typeof query === "string") {
    matches.push(...(await Movie.find({ name: query })));

    const category = await Category.findOne({ name: query });
    if (category != null)
      matches.push(
        ...(await Movie.find({ categories: { $in: category._id } }))
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
