const express = require("express");

const RecommendRouter = require("./recommendRouter");
const MovieSearchRouter = require("./movieSearchRouter");
const movieController = require("../controllers/movieController");

var router = express.Router();
// Get all categories and create a new category
router
  .route("/")
  .get(movieController.getMovies)
  .post(movieController.createMovie);
// Modify one category based on its ID
router
  .route("/:id")
  .get(movieController.getMovieById)
  .delete(movieController.deleteMovie)
  .put(movieController.updateMovie);

router.use("/:id/recommend", RecommendRouter);
router.use("/search", MovieSearchRouter);

module.exports = router;
