const movieService = require("../services/movieService");
const createMovie = async (req, res) => {
  let movie;
  try {
    movie = await movieService.createMovie(
      req.body.name,
      req.body.categories
    );
  
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(201).json(movie);
};