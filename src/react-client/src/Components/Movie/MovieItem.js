import React, { useState } from "react";
import { MovieDetails } from "./MovieDetails";
import { getMovieHttp } from "../../HttpRequest/getMovieHttp";
import "./MovieItem.css";
export const MovieItem = ({ movie }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  // When clicking on a movie picture, fetch the movie details then show details window
  const handleClick = (movieData) => {
    setSelectedMovie(movieData);
  };

  // Function to close the MovieDetails modal
  const closeDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-item">
      <img
        src={movie.thumbnailPath}
        alt={movie.name}
        className="movie-thumbnail"
        onClick={() => handleClick(movie)}
      />

      {/* Render MovieDetails if a movie is selected */}
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={closeDetails} />
      )}
    </div>
  );
};
