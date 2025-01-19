import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { queryHttp } from "../../HttpRequest/queryHttp";
import { MovieList } from "../../Components/Movie/MovieList";
import { useNavigate } from "react-router";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { routes } from "../../Pages/AppRouter";

export const SearchPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not logged in, redirect to the landing page
    if (!auth.token) {
      navigate(routes.Landing);
    }
  }, [auth, navigate]);

  const [searchParams] = useSearchParams();
  const [searchMoviesResult, setSearchMovieResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { movies: movieArray } = await queryHttp(
          auth.token,
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
  }, [searchParams, auth]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-fluid py-4">
      <h1 className="text-center mb-4">Search Results</h1>
      <MovieList movies={searchMoviesResult} />
    </div>
  );
};
