const Movie = require("../models/movieModel");
const mongoose = require("mongoose");
// Define the error code for duplicate key
let ERROR_DUP_KEY = 11000;
const createMovie = async (name, categories,releaseDate) => {
  try {
    movie = await Movie.create({
      name: name,
      categories: categories,
      releaseDate: releaseDate,
      legacyId: await getUniqueLegacyId(),
    });
  } catch (error) {
    if (error.code === ERROR_DUP_KEY) {
      throw new Error("This movie already exists");
    } else {
      throw new Error("Error creating Movie: " + error.message);
    }
  }
  return await movie.save();
};
const getUniqueLegacyId = async () => {
  let legacyId;
  do {
    legacyId = getRandomInt32();
  } while ((await Movie.findOne({ legacyId: legacyId })) != null);
  return legacyId;
};

function getRandomInt32() {
  const min = -2147483648; // Minimum 32-bit signed integer
  const max = 2147483647; // Maximum 32-bit signed integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getMovieById = async (id) => {
  if (!mongoose.isValidObjectId(id)) {return null;}
  const movie = await Movie.findById(id);
  if (!movie) {
    return null;
  }
  return movie;
};
const getMovies = async () => {
  return await Movie.find({});
};

const deleteMovie = async (id) => {
  const movie = await getMovieById(id);
  if (!movie) {
    return null;
  }
  await movie.deleteOne({ _id: id });
  return movie;
};

const updateMovie = async (name, categories, releaseDate, id) => {
  const movie = await getMovieById(id); // Retrieve the movie by ID
  if (!movie) {
    return null; 
  }

  // Update the properties
  movie.name = name;
  movie.categories = categories;
  movie.releaseDate = releaseDate;

  // Save the updated movie
  try {
    const updatedMovie = await movie.save();
    return updatedMovie;
  } catch (error) {
    throw new Error("Error updating movie: " + error.message);
  }
}
module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
  getMovieById,
  updateMovie,
};
