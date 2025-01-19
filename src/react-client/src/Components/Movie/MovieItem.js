import React, { useState } from "react";
import { MovieDetails } from "./MovieDetails";
import "./MovieItem.css";
import { ServerImage } from "../ServerMedia/ServerImage";

export const MovieItem = ({ movie, handleArrow }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  // set the selected movie and open the MovieDetails modal
  const handleClick = (movieData) => {
    setSelectedMovie(movieData);
    // set the arrow state to false to hide the arrows when the modal is open
    if (handleArrow) {
      handleArrow();
    }
  };

  // Function to close the MovieDetails modal
  const closeDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-item">
      <ServerImage
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
