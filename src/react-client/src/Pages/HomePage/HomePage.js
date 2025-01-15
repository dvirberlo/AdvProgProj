import { useState } from "react";
import { NavBarTemplate } from "../../Components/NavBar/NavBarTemplate";
import { MovieDetails } from "../../Components/MovieDetails/MovieDetails";
import img from "./img.jpg";
import { getMoviesHttp } from "../../HttpRequest/getMovieHttp";

export const HomePage = () => {
  // const movie = {
  //   imageUrl: img,
  //   title: "movie",
  //   description: "hello team...",
  //   rating: "★★★★☆",
  //   year: "2025",
  //   genre: "Drama",
  // };
  //const [counter, setCounter] = useState(0);
  movie = getMoviesHttp();
  return (
    <NavBarTemplate>
      <MovieDetails movie={movie} />
      <div className="container"></div>
    </NavBarTemplate>
  );
};
