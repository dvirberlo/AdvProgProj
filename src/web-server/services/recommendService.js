const net = require("net");
const Watch = require("../models/watchModel");
const PORT = 8080;
const IP = "127.0.0.1";

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

const parseRecommendations = (response) => {
  const cleanedResponse = response.replace(/^200 OK\n\n?/, "").trim();
  if (cleanedResponse.length === 0) {
    return [];
  }
  const movieArray = cleanedResponse
    .split(" ")
    .map((movie) => movie.trim())
    .filter((movie) => movie.length > 0);
  return movieArray;
};

const createWatch = async (userId, movieId) => {
  const watch = new Watch({
    watcher: userId,
    movie: movieId,
  });
  return await watch.save();
};

module.exports = {
  getRecommendations,
  postWatch,
  patchWatch,
  deleteWatch,
  parseRecommendations,
  createWatch,
};
