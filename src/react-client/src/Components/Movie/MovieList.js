import React from "react";
import { MovieItem } from "./MovieItem";
import "./MovieList.css";
export const MovieList = ({ movies }) => {
  return (
    <div className="movie-list-container">
      <div className="movies-row search-page-row">
        {movies.map((movie) => (
          <MovieItem key={movie._id} movie={movie} />
        ))}
        {movies.length === 0 && <div>No movies found</div>}
      </div>
    </div>
  );
};
