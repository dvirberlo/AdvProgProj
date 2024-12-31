const mongoose = require("mongoose");

const movieService = require("../services/movieService");
const userService = require("../services/userService");
const { MongoError } = require("../constants/mongoDBErrors");
const createMovie = async (req, res) => {
  let movie;
  try {
    movie = await movieService.createMovie(
      req.body.name,
      req.body.categories,
      req.body.releaseDate
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ error: error.message });
    if (error?.code === MongoError.DuplicateKey.code)
      return res.status(409).json({ error: error.message });
    return res.status(500).json({ error: error?.message });
  }
  return res.status(201).json(movie);
};
const getMovies = async (req, res) => {
  // not necessary for that exercise but good practice
  if (!req.headers["token-id"]) {
    return res.status(401).json({ error: "Token is required" });
  }
  // check if the existing user having that token-id
  if (userService.getUserById(req.headers["token-id"]) === null) {
    return res.status(401).json({ error: "User not found" });
  }
  try {
    let movies = await movieService.getMovies(req.headers["token-id"]);
    if (!movies) {
      return res.status(404).json({ error: "Movies not found" });
    } else {
      return res.json(movies);
    }
  } catch (error) {
    console.error("movieController: getMovies internal error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await movieService.deleteMovie(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    return res.status(204).json({}); // return empty response
  } catch (error) {
    if (error.message === "Movie not found") {
      return res.status(404).json({ error: "Movie not found" });
    }
    if (error.message === "Bad Request") {
      return res
        .status(500)
        .json({ error: "movieController: deleteMovie internal error:" });
    } else {
      console.error("movieController: deleteMovie internal error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
const getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    } else {
      return res.json(movie);
    }
  } catch (error) {
    console.error("movieController: getMovieById internal error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateMovie = async (req, res) => {
  if (!req.body.categories) {
    return res
      .status(400)
      .json({ error: "Categories is required in Put command" });
  }
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required in Put command" });
  }
  if (!req.body.releaseDate) {
    return res
      .status(400)
      .json({ error: "releaseDate is required in Put command" });
  }
  let movie;
  try {
    movie = await movieService.updateMovie(
      req.body.name,
      req.body.categories,
      req.body.releaseDate,
      req.params.id
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  return res.status(204).json({}); // return empty response
};
module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
  getMovieById,
  updateMovie,
};
