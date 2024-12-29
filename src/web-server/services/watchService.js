const Watch = require("../models/watchModel");
const createWatch = async (userId, movieId) => {
  const watch = new Watch({
    watcher: userId,
    movie: movieId,
  });
  return await watch.save();
};

const updateWatchDate = async (userId, movieId) => {
  try {
    // Check if a watch entry already exists for the user and movie
    let watch = await Watch.findOne({ watcher: userId, movie: movieId });

    if (watch) {
      // If the watch exists, update the date to today
      watch.date = new Date();
      await watch.save();
      return watch;
    } else {
      // If the watch doesn't exist, throw an exception
      throw new Error(
        `No watch entry found for user ${userId} and movie ${movieId}`,
      );
    }
  } catch (error) {
    console.error("Error while updating watch date:", error);
    throw new Error("Unable to update the watch entry: " + error.message);
  }
};

const hasWatchedMovies = async (userId) => {
  try {
    const watchRecord = await Watch.findOne({ watcher: userId });
    if (watchRecord) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking if user has watched any movie:", error);
    throw new Error(
      "Unable to check if user has watched any movie: " + error.message,
    );
  }
};

module.exports = { createWatch, updateWatchDate, hasWatchedMovies };
