const Movie = require("../models/movieModel");

/**
 * @param {String?} query
 * @return movies that has a field that match the specified query
 */
const searchMovies = async (query) => {
  return await Movie.find({
    $or: [{ name: query }, { releaseDate: query }],
  });
};

module.exports = {
  searchMovies,
};
