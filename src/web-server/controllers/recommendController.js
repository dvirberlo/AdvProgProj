const recommendService = require("../services/recommendService");
const TokenId = "token-id";

// Controller function to get recommendations
const getRecommendations = async (req, res) => {
  const userId = req.headers[TokenId];
  const movieId = req.params.id;

  if (!userId) {
    return res.status(401).json({ error: "Token-ID header is missing" });
  }

  try {
    const recommendations = await recommendService.getRecommendations(
      userId,
      movieId
    );
    if (recommendations.error) {
      return res
        .status(recommendations.status)
        .json({ error: recommendations.error });
    }
    return res.status(200).json({ recommendation: recommendations.data });
  } catch (error) {
    console.error("Error in getRecommendations controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addWatch = async (req, res) => {
  const userId = req.headers[TokenId];
  const movieId = req.params.id;
  if (!userId) {
    return res.status(401).json({ error: "Token-ID header is missing" });
  }

  try {
    // Call the service function to add watch
    const result = await recommendService.addWatch(userId, movieId);

    // Return the result based on the response from the service
    if (result.status === 201) {
      return res
        .status(201)
        .json({ watcher: `${userId}`, movie: `${movieId}` });
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
