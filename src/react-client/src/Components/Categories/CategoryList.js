import React, { useRef } from "react";
import { MovieItem } from "../Movie/MovieItem";
import "./CategoryList.css";

export const CategoryList = ({ categoryName, movies }) => {
  // ref to the row div to scroll left and right
  const rowRef = useRef(null);

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="category-list-container">
      <h3 className="category-list-title">{categoryName}</h3>

      <span
        className="material-symbols-outlined arrow-icon arrow-left"
        onClick={scrollLeft}
      >
        chevron_left
      </span>

      <div className="movies-row" ref={rowRef}>
        {movies.map((movie) => (
          <MovieItem key={movie._id} movie={movie} />
        ))}
      </div>

      <span
        className="material-symbols-outlined arrow-icon arrow-right"
        onClick={scrollRight}
      >
        chevron_right
      </span>
    </div>
  );
};
