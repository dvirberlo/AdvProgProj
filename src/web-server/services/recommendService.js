const net = require("net");
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
const postWatch = async (userId, movieId) => {
  try {
    const response = await sendRequest("POST", userId, movieId);

    return response;
  } catch (error) {
    console.error("Error in post Watch:", error);
    throw error;
  }
};
const patchWatch = async (userId, movieId) => {
  try {
    const response = await sendRequest("PATCH", userId, movieId);

    return response;
  } catch (error) {
    console.error("Error in patch Watch:", error);
    throw error;
  }
};

// Service function for getting recommendations
const getRecommendations = async (userId, movieId) => {
  try {
    // Send a GET request for recommendations
    const response = await sendRequest("GET", userId, movieId);

    return response; // Return the response from the GET request
  } catch (error) {
    console.error("Error in getRecommendations:", error);
    throw error; // Propagate error if there's an issue
  }
};

const deleteWatch = async (userId, movieId) => {
  try {
    const response = await sendRequest("DELETE", userId, movieId);

    return response;
  } catch (error) {
    console.error("Error in deleteWatch:", error);
    throw error;
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

module.exports = {
  getRecommendations,
  postWatch,
  patchWatch,
  deleteWatch,
  parseRecommendations,
};
