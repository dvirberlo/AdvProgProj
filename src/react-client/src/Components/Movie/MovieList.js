import React from "react";
import { MovieItem } from "./MovieItem";
import "./MovieList.css";
export const MovieList = ({ movies }) => {
  return (
    <div className="movie-list-container">
      <h5 className="more-to-explore">More to explore :</h5>
      <div className="movies-row search-page-row">
        {movies.map((movie) => (
          <MovieItem key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
