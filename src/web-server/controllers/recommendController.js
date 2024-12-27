const recommendService = require("../services/recommendService");
const userService = require("../services/userService");
const movieService = require("../services/movieService");
const TokenId="token-id";
// Controller function to get recommendations
const getRecommendations = async (req, res) => {

  const userId = req.headers[TokenId];
  if (!userId) {
    return res.status(400).json({ error: "Token-ID header is missing" });
  }

  let userLegacyId;
  let movieLegacyId;

  try {
    // Get user by userId
    const user = await userService.getUserById(userId);
    if (user == null) {
      return res
        .status(404)
        .json({ error: "The specified user id does not exist" });
    }

    userLegacyId = user.legacyId;
  } catch (error) {
    console.error("userController: getUser internal error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    // Get movie by movieId (from the route parameter)
    const movie = await movieService.getMovieById(req.params.id);
    if (movie == null) {
      return res
        .status(404)
        .json({ error: "The specified movie id does not exist" });
    }

    movieLegacyId = movie.legacyId;
  } catch (error) {
    console.error("movieController: getMovie internal error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    // Get recommendations based on user legacyId and movie legacyId
    const recommendations = await recommendService.getRecommendations(
      userLegacyId,
      movieLegacyId,
    );

    if (recommendations.startsWith("200 OK\n")) {
      const cleanedResponse =
        recommendService.parseRecommendations(recommendations);
      return res.status(200).json({ recommendation: `${cleanedResponse}` });
    } else if (recommendations === "400 Bad Request\n") {
      return res.status(400).json();
    } else if (recommendations === "404 Not Found\n") {
      return res.status(404).json();
    }

    // If the response is not recognized, return a generic error
    return res.status(500).json({ error: "Unexpected response from server" });
  } catch (error) {
    console.error("Error in getRecommendations controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addWatch = async (req, res) => {

  const userId = req.headers[TokenId]; // Get userId from token header
  if (!userId) {
    return res.status(400).json({ error: "Token-ID header is missing" });
  }

  let userLegacyId;
  let movieLegacyId;

  try {
    // Get the user details by userId
    const user = await userService.getUserById(userId);
    if (user == null) {
      return res
        .status(404)
        .json({ error: "The specified user id does not exist" });
    }

    // Get the user's legacy ID
    userLegacyId = user.legacyId;
  } catch (error) {
    console.error("userController: getUser internal error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    // Get movie details by movieId (from the route parameter)
    const movie = await movieService.getMovieById(req.params.id);
    if (movie == null) {
      return res
        .status(404)
        .json({ error: "The specified movie id does not exist" });
    }

    // Get the movie's legacy ID
    movieLegacyId = movie.legacyId;
  } catch (error) {
    console.error("movieController: getMovie internal error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    // Try to add the movie to the watch list with postWatch
    let addWatchResponse = await recommendService.postWatch(
      userLegacyId,
      movieLegacyId,
    );

    // If the user is already in the watch list, try to add it with patchWatch
    if (addWatchResponse === "404 Not Found\n") {
      addWatchResponse = await recommendService.patchWatch(
        userLegacyId,
        movieLegacyId,
      );
    }

    if (addWatchResponse === "201 Created\n") {
      // If the watch was successfully added, create the watch record in the service
      await recommendService.createWatch(userId, req.params.id);
      return res
        .status(201)
        .json({ watcher: `${userId}`, movie: `${req.params.id}` });
    } else if (addWatchResponse === "204 No Content\n") {
      // If no content is returned but still successful
      await recommendService.createWatch(userId, req.params.id);
      return res.status(204).json();
    } else if (addWatchResponse === "400 Bad Request\n") {
      return res.status(400).json();
    } else if (addWatchResponse === "404 Not Found\n") {
      return res.status(404).json();
    }

    // If an unknown response is received, return a generic error
    return res.status(500).json({ error: "Unexpected response from server" });
  } catch (error) {
    console.error("Error occurred while adding watch:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getRecommendations,
  addWatch,
};
