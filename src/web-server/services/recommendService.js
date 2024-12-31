const net = require("net");
const mongoose = require("mongoose");
const userService = require("./userService");
const Movie = require("../models/movieModel");
const watchService = require("./watchService");
const Watch = require("../models/watchModel");
// Load environment variables (default to "local")
require("custom-env").env(process.env.NODE_ENV ?? "local", "./config");
const PORT = process.env.RECOMMEND_PORT;
const IP = process.env.RECOMMEND_IP;

// Generic function to send requests to the C++ server
const sendRequest = (command, userId, movieId, port = PORT) => {
  return new Promise((resolve, reject) => {
    const message = `${command} ${userId} ${movieId}`;

    const client = new net.Socket();

    client.connect(port, IP, () => {
      client.write(message + "\n");
    });

    client.on("data", (data) => {
      resolve(data.toString());
      client.destroy();
    });

    client.on("error", (err) => {
      console.error("Error occurred:", err);
      reject(err);
      client.destroy();
    });
  });
};

// Service function for adding a movie to the watch list
const postWatch = async (userLegacyId, movieLegacyId) => {
  try {
    const response = await sendRequest("POST", userLegacyId, movieLegacyId);

    return response;
  } catch (error) {
    console.error("Error in post Watch:", error);
    throw error;
  }
};
const patchWatch = async (userLegacyId, movieLegacyId) => {
  try {
    const response = await sendRequest("PATCH", userLegacyId, movieLegacyId);

    return response;
  } catch (error) {
    console.error("Error in patch Watch:", error);
    throw error;
  }
};

const deleteWatch = async (userLegacyId, movieLegacyId) => {
    try {
      const response = await sendRequest("DELETE", userLegacyId, movieLegacyId);
  
      return response;
    } catch (error) {
      console.error("Error in deleteWatch:", error);
      throw error;
    }
  };
  
  const fetchRecommendations = async (userLegacyId, movieLegacyId) => {
      try {
        // Send a GET request for recommendations
        const response = await sendRequest("GET", userLegacyId, movieLegacyId);
        return response; // Return the response from the GET request
      } catch (error) {
        console.error("Error in fetchRecommendations:", error);
        throw error; // Propagate error if there's an issue
      }
    };

// Service function for getting recommendations
const getRecommendations = async (userId, movieId) => {
    try {
      // Retrieve user and movie
      const user = await userService.getUserById(userId);
      if (!user) {
        return { error: "The specified user id does not exist", status: 400 };
      }
  
      const movie = await getMovieById(movieId);
      if (!movie) {
        return { error: "The specified movie id does not exist", status: 400 };
      }
  
      // Check if the user has watched any movies
      const hasWatched = await watchService.hasWatchedMovies(userId);
      if (!hasWatched) {
        return { data: [], status: 200 };  
      }
  
      // Get recommendations based on legacy IDs
      const recommendations = await fetchRecommendations(user.legacyId, movie.legacyId); 
  
      if (recommendations.startsWith("200 OK\n")) {
        // Parse the recommendations if response starts with "200 OK"
        const parsedRecommendations = await parseRecommendations(recommendations);
        return { data: parsedRecommendations, status: 200 };
      } else if (recommendations.startsWith("400 Bad Request\n")) {
        return { error: "Bad Request", status: 400 };
      } else if (recommendations.startsWith("404 Not Found\n")) {
        return { error: "Not Found", status: 404 };
      }
  
      // Default error case if the response doesn't match expected patterns
      return { error: "Unexpected response from recommendation service", status: 500 };
    } catch (error) {
      console.error("Error while fetching recommendations:", error);
      return { error: "Internal Server Error", status: 500 };
    }
  };
  
  const addWatch = async (userId, movieId) => {
    try {
      // Retrieve user and movie
      const user = await userService.getUserById(userId);
      if (!user) {
        return { error: "The specified user id does not exist", status: 400 };
      }
  
      const movie = await getMovieById(movieId);
      if (!movie) {
        return { error: "The specified movie id does not exist", status: 400 };
      }
  
      const userLegacyId = user.legacyId;
      const movieLegacyId = movie.legacyId;
  
      // Try to add the movie to the watch list with postWatch
      let addWatchResponse = await postWatch(userLegacyId, movieLegacyId);
  
      // If the user is already in the watch list, try to add it with patchWatch
      if (addWatchResponse.startsWith("404 Not Found\n")) {
        addWatchResponse = await patchWatch(userLegacyId, movieLegacyId);
      }
  
      if (addWatchResponse.startsWith("201 Created\n")) {
        // Successfully added, create the watch record
        await watchService.createWatch(userId, movieId);
        return { message: "Watch added successfully", status: 201 };
      } else if (addWatchResponse.startsWith("204 No Content\n")) {
        // Check if already in the watch list
        const watch = await Watch.findOne({ watcher: userId, movie: movieId });
        if (!watch) {
          // No entry, create new watch record
          await watchService.createWatch(userId, movieId);
          return { message: "Watch added successfully", status: 201 };
        }
        // If no content but already in the list, update the date
        await watchService.updateWatchDate(userId, movieId);
        return { message: "Watch updated successfully", status: 204 };
      } else if (addWatchResponse.startsWith("400 Bad Request\n")) {
        return { error: "Bad Request", status: 400 };
      } else if (addWatchResponse.startsWith("404 Not Found\n")) {
        return { error: "Not Found", status: 404 };
      }
  
      // Default case for unexpected responses
      return { error: "Unexpected response from recommendation service", status: 500 };
    } catch (error) {
      console.error("Error occurred while adding watch:", error);
      return { error: "Internal server error", status: 500 };
    }
  };
  

const parseRecommendations = async (response) => {
  const cleanedResponse = response.replace(/^200 OK\n\n?/, "").trim();
  if (cleanedResponse.length === 0) {
    return [];
  }

  // Split the response into individual legacyIds
  const legacyIdArray = cleanedResponse
    .split(" ")
    .map((movie) => movie.trim())
    .filter((movie) => movie.length > 0);

  // Use the legacyId array to find the movie IDs from the database
  const movieIds = [];

  for (const legacyId of legacyIdArray) {
    try {
      const movie = await getMovieByLegacyId(legacyId);
      if (movie) {
        movieIds.push(movie._id); // Push the movie's ObjectId
      } else {
        throw new Error(`Movie with legacyId ${legacyId} not found.`);
      }
    } catch (error) {
      console.error(`Error fetching movie for legacyId ${legacyId}:`, error);
      throw new Error(
        `Failed to process movie with legacyId ${legacyId}: ${error.message}`,
      );
    }
  }

  return movieIds;
};

const getMovieByLegacyId = async (legacyId) => {
    const movie = await Movie.findOne({ legacyId: legacyId });
    if (!movie) {
      return null;
    }
    return movie;
  };

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

module.exports = {
  getRecommendations,
  postWatch,
  patchWatch,
  deleteWatch,
  parseRecommendations,
  addWatch,
};
