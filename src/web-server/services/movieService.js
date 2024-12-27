const Movie = require("../models/movieModel");
const mongoose = require("mongoose");
const Watch = require("../models/watchModel");
const Category = require("../models/categoryModel");
const Recommend = require("./recommendService");
const User = require("./userService");

// Define the error code for duplicate key
let ERROR_DUP_KEY = 11000;

const createMovie = async (name, categories, releaseDate) => {
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
    // Find all promoted categories
    const promotedCategories = await Category.find({ promoted: true });

    // Create a plain object to store results (serializable to JSON)
    const results = {};

    // For each promoted category, find up to 20 movies the user has not watched
    for (const category of promotedCategories) {
      // Find all movies in this category
      const movies = await Movie.find({ categories: category._id });

      // Collect unwatched movies
      const unwatchedMovies = [];

      for (const movie of movies) {
        // Check if the user has already watched this movie
        const hasWatched = await Watch.findOne({
          watcher: userId,
          movie: movie._id,
        });
        // If the user has NOT watched this movie, push it to `unwatchedMovies`
        if (!hasWatched) {
          unwatchedMovies.push(movie._id);
        }
      }

      // Shuffle the unwatched movies for randomness
      const shuffledUnwatchedMovies = shuffle(unwatchedMovies);
      // Keep only the first 20
      const limitedUnwatchedMovies = shuffledUnwatchedMovies.slice(0, 20);

      // Only add a category if there's at least one unwatched movie
      if (limitedUnwatchedMovies.length > 0) {
        results[category.name] = limitedUnwatchedMovies;
      }
    }

    // Now we add a special entry for the last 20 movies the user has watched
    let watchedMovies = await Watch.find({ watcher: userId }).populate("movie");

    // Sort by date (assuming `a.date` and `b.date` are valid date fields in the Watch model)
    watchedMovies.sort((a, b) => a.date - b.date);

    // Take only the last 20
    watchedMovies = watchedMovies.slice(-20);

    // Create a "Watched Movies" category in results
    results["Watched Movies"] = watchedMovies.map((watch) => watch.movie._id);

    // Return the aggregated results
    return results;
  } catch (error) {
    console.error("Error retrieving unwatched movies by category:", error);
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
    // Now we update the files database and
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
};
module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
  getMovieById,
  updateMovie,
};
