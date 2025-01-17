const Movie = require("../models/movieModel");
const mongoose = require("mongoose");
const Watch = require("../models/watchModel");
const { Category, WATCHED_MOVIES_NAME } = require("../models/categoryModel");
const Recommend = require("./recommendService");
const User = require("./userService");
// Define the maximum number of movies to return in the get function, at a time the exercise is asking for 20
const MAX_MOVIES = 20;

// Define the error code for duplicate key
const ERROR_DUP_KEY = 11000;

const createMovie = async (
  name,
  description,
  length,
  rating,
  categories,
  releaseYear,
  filePath,
  thumbnailPath
) => {
  const movie = await Movie.create({
    name: name,
    description: description,
    length: length,
    rating: rating,
    categories: categories,
    releaseYear: releaseYear,
    filePath: filePath,
    thumbnailPath: thumbnailPath,
    legacyId: await getUniqueLegacyId(),
  });
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
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }
  const movie = await Movie.findById(id);
  if (!movie) {
    return null;
  }
  return movie;
};
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const getMovies = async (userId) => {
  // Validate userId
  if (!mongoose.isValidObjectId(userId)) {
    return null;
  }

  try {
    // Find all promoted categories and populate their movies
    const promotedCategories = await Category.find({ promoted: true });

    // Create an array to store the results
    const results = [];
    // Iterate over each promoted category
    for (const category of promotedCategories) {
      // Find all movies in this category
      const moviesInCategory = await Movie.find({ categories: category._id });

      // Extract movie IDs the user has watched in this category
      const watchedMovieIds = await Watch.find({
        watcher: userId,
        movie: { $in: moviesInCategory.map((m) => m._id) },
      })
        .select("movie")
        .lean()
        .exec();

      const watchedIdsSet = new Set(
        watchedMovieIds.map((w) => w.movie.toString())
      );

      // Filter movies the user has not watched
      const unwatchedMovies = moviesInCategory.filter(
        (movie) => !watchedIdsSet.has(movie._id.toString())
      );

      if (unwatchedMovies.length === 0) {
        continue; // Skip categories with no unwatched movies
      }

      // Shuffle and limit the movies
      const shuffledUnwatchedMovies = shuffle(unwatchedMovies).slice(
        0,
        MAX_MOVIES
      );

      // Add to results
      results.push({
        _id: category._id,
        name: category.name,
        promoted: category.promoted,
        movies: shuffledUnwatchedMovies,
      });
    }

    // Now handle "Watched Movies"
    const watchedMovies = await Watch.find({ watcher: userId })
      .populate("movie")
      .sort({ date: -1 })
      .limit(MAX_MOVIES)
      .lean()
      .exec();

    const watchedMoviesDetails = watchedMovies
      .map((watch) => watch.movie)
      .filter((movie) => movie !== null) // Ensure the movie exists
      .reverse();

    if (watchedMoviesDetails.length > 0) {
      results.push({
        name: WATCHED_MOVIES_NAME,
        movies: shuffle(watchedMoviesDetails),
      });
    }

    return results;
  } catch (error) {
    console.error("Error retrieving movies:", error);
    throw error;
  }
};

const deleteMovie = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  try {
    // Find the movie by ID
    const movie = await getMovieById(id);
    if (!movie) {
      // If the movie does not exist, return null
      return null;
    }
    // Get the legacyId of the movie

    const legacyIdMovie = movie.legacyId;
    // Find all watches that have this movie as the watched movie
    const watches = await Watch.find({ movie: movie._id }).populate("watcher");
    /* extract the watcher ObjectId from each : we need the 
//        legacyId from each one of them */
    const watcherIds = watches.map((watch) => watch.watcher?._id);
    /* Delete all the documents in the Watch collection that have the same
        movie ID as the one we got as input */
    // Delete all from the Watch collection!
    await Watch.deleteMany({ movie: movie._id });
    // Delete the movie from the Movie collection!
    await movie.deleteOne({ _id: id });
    // Now we delete the files in the database
    for (const watcherId of watcherIds) {
      if (!mongoose.isValidObjectId(watcherId)) {
        // check if valid ObjectId : if not valid, skip
        console.warn(`Skipping invalid watcher ID: ${watcherId}`);
        continue;
      }
      const user = await User.getUserById(watcherId);

      if (!user) {
        console.warn(`No user found for watcher ID: ${watcherId}`);
        continue;
      }

      const legacyIdUser = user.legacyId;

      const response = await Recommend.deleteWatch(legacyIdUser, legacyIdMovie);

      if (response !== "204 No Content\n") {
        if (response === "404 Not Found\n") {
          throw new Error("Movie not found in the user's watch list");
        } else if (response === "400 Bad Request\n") {
          throw new Error("Bad Request");
        } else {
          throw new Error(
            `Unexpected response from Recommend service: ${response}`
          );
        }
      }
    }

    return movie;
  } catch (error) {
    throw new Error("Error deleting movie: " + error.message);
  }
};
/* After a category has been deleted on the category document, 
we need to delete the category from the movie document
Input : category id*/
const deleteCategory = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    // indicate that the category ID is invalid
    return false;
  }
  try {
    // Pull the category 'id' from the categories array in all matching movies
    await Movie.updateMany({ categories: id }, { $pull: { categories: id } });

    // return true to indicate that the category was removed from the arrays
    return true;
  } catch (error) {
    throw new Error("Error removing category from movies: " + error.message);
  }
};

const updateMovie = async (
  id,
  name,
  description,
  length,
  rating,
  categories,
  releaseYear,
  filePath,
  thumbnailPath
) => {
  const movie = await getMovieById(id); // Retrieve the movie by ID
  if (!movie) {
    return null;
  }

  // Update the properties
  movie.name = name;
  movie.description = description;
  movie.length = length;
  movie.rating = rating;
  movie.categories = categories;
  movie.releaseYear = releaseYear;
  movie.filePath = filePath;
  movie.thumbnailPath = thumbnailPath;

  // Save the updated movie
  try {
    const updatedMovie = await movie.save();
    return updatedMovie;
  } catch (error) {
    throw new Error("Error updating movie: " + error.message);
  }
};
const getMovieByLegacyId = async (legacyId) => {
  const movie = await Movie.findOne({ legacyId: legacyId });
  if (!movie) {
    return null;
  }
  return movie;
};
module.exports = {
  getMovieByLegacyId,
  createMovie,
  getMovies,
  deleteMovie,
  getMovieById,
  updateMovie,
  deleteCategory,
};
