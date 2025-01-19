const mongoose = require("mongoose");

const movieService = require("../services/movieService");
const tokenService = require("../services/tokenService");
const { MongoError } = require("../constants/mongoDBErrors");
const {
  getUploadedFilePath,
  uploadFieldsMiddleware,
} = require("./fileUploads");
const { TOKEN_ID_HEADER } = require("../constants/httpHeaders");

const movieFileFields = {
  movie: "movieFile",
  thumbnail: "thumbnailFile",
};
const movieUploads = uploadFieldsMiddleware(Object.values(movieFileFields));

const createMovie = async (req, res) => {
  const movieFilePath = getUploadedFilePath(req, movieFileFields.movie);
  const thumbnailFilePath = getUploadedFilePath(req, movieFileFields.thumbnail);
  if (movieFileFields == null || thumbnailFilePath == null) {
    return res
      .status(400)
      .json({ error: "Please provide a movie file and a thumbnail file." });
  }

  try {
    const movie = await movieService.createMovie(
      req.body.name,
      req.body.description,
      req.body.length,
      req.body.rating,
      req.body.categories,
      req.body.releaseYear,
      movieFilePath,
      thumbnailFilePath
    );
    return res.status(201).json(movie);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ error: error.message });
    if (error?.code === MongoError.DuplicateKey.code)
      return res.status(409).json({ error: error.message });
    return res.status(500).json({ error: error?.message });
  }
};
const getMovies = async (req, res) => {
  // not necessary for that exercise but good practice
  if (!req.headers[TOKEN_ID_HEADER]) {
    return res.status(401).json({ error: "Token is required" });
  }
  // check if the existing user having that token-id
  const user = await tokenService.verifyToken(req.headers[TOKEN_ID_HEADER]);
  if (user === null) {
    return res.status(404).json({ error: "User not found" });
  }
  try {
    let movies = await movieService.getMovies(user.id);
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
const putMovie = async (req, res) => {
  const movieFilePath = getUploadedFilePath(req, movieFileFields.movie);
  const thumbnailFilePath = getUploadedFilePath(req, movieFileFields.thumbnail);
  if (
    req.params.id == null ||
    req.body.name == null ||
    req.body.description == null ||
    req.body.length == null ||
    req.body.rating == null ||
    req.body.categories == null ||
    req.body.releaseYear == null ||
    movieFilePath == null ||
    thumbnailFilePath == null
  )
    return res
      .status(400)
      .json({ error: "All movie fields must be specified" });

  try {
    const movie = await movieService.updateMovie(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.length,
      req.body.rating,
      req.body.categories,
      req.body.releaseYear,
      movieFilePath,
      thumbnailFilePath
    );
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    return res.status(204).json({});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const updateMovie = async (req, res) => {
  const movieFilePath = getUploadedFilePath(req, movieFileFields.movie);
  const thumbnailFilePath = getUploadedFilePath(req, movieFileFields.thumbnail);

  try {
    const movie = await movieService.updateMovie(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.length,
      req.body.rating,
      req.body.categories,
      req.body.releaseYear,
      movieFilePath,
      thumbnailFilePath
    );
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    return res.status(204).json({});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  movieUploads,
  createMovie,
  getMovies,
  deleteMovie,
  getMovieById,
  putMovie,
  updateMovie,
};
