const express = require("express");
const mongoose = require("mongoose");

const MovieSearchService = require("../services/movieSearchService");
const { verifyToken } = require("../services/tokenService");
const { TOKEN_ID_HEADER } = require("../constants/httpHeaders");

/**
 * search for movies based on the specified query in request's params
 * @param {express.Request} req
 * @param {express.Response} res
 */
const searchMovies = async (req, res) => {
  try {
    const user = await verifyToken(req.headers[TOKEN_ID_HEADER]);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const movies = await MovieSearchService.searchMovies(req.params.query);
    return res.status(200).json({ movies: movies });
  } catch (error) {
    console.error("movieSearchController: searchMovies internal error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  searchMovies,
};
