const recommendService = require("../services/recommendService");
const movieService = require("../services/movieService");
const tokenService = require("../services/tokenService");
const { TOKEN_ID_HEADER } = require("../constants/httpHeaders");

// Controller function to get recommendations
const getRecommendations = async (req, res) => {
  // check if the existing user having that token-id
  const user = await tokenService.verifyToken(req.headers[TOKEN_ID_HEADER]);
  if (user === null)
    return res.status(401).json({ error: "User token is invalid" });

  const movieId = req.params.id;
  try {
    const recommendations = await recommendService.getRecommendations(
      user.id,
      movieId
    );
    if (recommendations.error) {
      return res
        .status(recommendations.status)
        .json({ error: recommendations.error });
    }
    // populate the response with the recommended movies
    const recommendedMovies = [];
    for (const movieId of recommendations.data) {
      recommendedMovies.push(await movieService.getMovieById(movieId));
    }
    return res.status(200).json(recommendedMovies);
  } catch (error) {
    console.error("Error in getRecommendations controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addWatch = async (req, res) => {  
  // check if the existing user having that token-id
  const user = await tokenService.verifyToken(req.headers[TOKEN_ID_HEADER]);
  if (user === null)
    return res.status(401).json({ error: "User token is invalid" });

  const movieId = req.params.id;

  try {
    // Call the service function to add watch
    const result = await recommendService.addWatch(user.id, movieId);

    // Return the result based on the response from the service
    if (result.status === 201) {
      return res
        .status(201)
        .json({ watcher: `${user.id}`, movie: `${movieId}` });
    } else if (result.status === 204) {
      return res.status(204).json();
    } else {
      return res
        .status(result.status)
        .json({ error: result.error || result.message });
    }
  } catch (error) {
    console.error("Error in addWatch controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getRecommendations,
  addWatch,
};
