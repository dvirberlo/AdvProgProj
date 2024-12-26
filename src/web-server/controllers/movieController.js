const movieService = require("../services/movieService");
const createMovie = async (req, res) => {
  let movie;
  try {
    movie = await movieService.createMovie(
      req.body.name,
      req.body.categories,
      req.body.releaseDate
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(201).json(movie);
};
const getMovies = async (req, res) => {
  try {
    res.status(200).json(await movieService.getMovies());
  } catch (error) {
    console.error("movieController: getMovies internal error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteMovie = async (req, res) => {
  console.log("here");
  try {
    const movie = await movieService.deleteMovie(req.params.id);
    console.log(movie);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    return res.status(204).json({}); // return empty response
  } catch (error) {
    console.error("movieController: deleteMovie internal error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    console.log(movie);
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
