const mongoose = require("mongoose");
const Movie = require("../models/movieModel");
const { Category, WATCHED_MOVIES_NAME } = require("../models/categoryModel");

/**
 * @param {String?} query
 * @return movies that has a field that match the specified query
 */
const searchMovies = async (query) => {
  const matches = [];
  // create case insensitive regular expression for query
  const regex = new RegExp(query, "i");

  if (typeof query === "string") {
    matches.push(
      ...(await Movie.find({
        $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
      }))
    );

    if (!isNaN(query)) {
      matches.push(
        ...(await Movie.find({
          $or: [{ length: query }, { rating: query }, { releaseYear: query }],
        }))
      );
    }

    const categories = await Category.find({ name: { $regex: regex } });
    const categoriesIds = categories.map((category) => category._id);
    if (categoriesIds.length > 0)
      matches.push(
        ...(await Movie.find({ categories: { $in: categoriesIds } }))
      );
  }
  // return without duplicates
  return Array.from(new Map(matches.map((item) => [item.id, item])).values());
};

module.exports = {
  searchMovies,
};
