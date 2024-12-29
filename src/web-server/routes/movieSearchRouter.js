const express = require("express");

const MovieSearchController = require("../controllers/movieSearchController");

const MovieSearchRouter = express.Router();

MovieSearchRouter.route("/:query").get(MovieSearchController.searchMovies);

module.exports = MovieSearchRouter;
