const express = require("express");
var router = express.Router();
const movieController = require("../controllers/movieController");
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
module.exports = router;
