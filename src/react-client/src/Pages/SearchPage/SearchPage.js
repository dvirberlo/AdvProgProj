import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { queryHttp } from "../../HttpRequest/queryHttp";
import { MovieList } from "../../Components/Movie/MovieList";

const demoToken = "67896ad97a9550763c011921";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchMoviesResult, setSearchMovieResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { movies: movieArray } = await queryHttp(
          demoToken,
          searchParams.get("q")
        );
        if (movieArray == null) {
          setError("Failed to fetch movies");
        } else {
          setSearchMovieResult(movieArray);
        }
      } catch (err) {
        setError("An error occurred while fetching movies.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-fluid py-4">
      <h1 className="text-center mb-4">Search Results:</h1>
      <MovieList movies={searchMoviesResult} />
    </div>
  );
};
