import React, { useRef, useState } from "react";
import { MovieItem } from "../Movie/MovieItem";
import "./CategoryList.css";

export const CategoryList = ({ categoryName, movies }) => {
  const rowRef = useRef(null);
  const [arrowState, setArrow] = useState(false);

  const handleMouseEnter = () => setArrow(true);
  const handleMouseLeave = () => setArrow(false);

  const scrollLeft = () => {
    if (rowRef.current) rowRef.current.scrollLeft -= 250;
  };

  const scrollRight = () => {
    if (rowRef.current) rowRef.current.scrollLeft += 250;
  };

  return (
    <div
      className="category-list-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="category-list-title">{categoryName}</h3>

      <div className="movies-row-category" ref={rowRef}>
        {movies.map((movie) => (
          <MovieItem key={movie._id} movie={movie} />
        ))}
      </div>

      {arrowState && (
        <>
          <span
            className="material-symbols-outlined arrow-icon-category arrow-left-category"
            onClick={scrollLeft}
          >
            chevron_left
          </span>
          <span
            className="material-symbols-outlined arrow-icon-category arrow-right-category"
            onClick={scrollRight}
          >
            chevron_right
          </span>
        </>
      )}
    </div>
  );
};
