import React, { useEffect, useState } from "react";
import { CategoryLists } from "../../Components/Categories/CategoryLists";
import { getMoviesHttp } from "../../HttpRequest/getMoviesHttp";
import { useNavigate } from "react-router";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { routes } from "../../Pages/AppRouter";
import { VideoPlayer } from "../../Components/VideoPlayer/VideoPlayer";

export const HomePage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not logged in, redirect to the landing page
    if (!auth.token) {
      navigate(routes.Landing);
    }
  }, [auth, navigate]);

  return (
    <div>
      <div className="container-fluid">
        <Movies />
      </div>
    </div>
  );
};

const Movies = () => {
  const { auth, setAuth } = useAuth();
  // State variables to manage categories data, loading state, and errors
  const [categoriesWithMovies, setCategoriesWithMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // function to fetch data
    const fetchMoviesCategories = async () => {
      try {
        const response = await getMoviesHttp(auth.token);
        if (response === null) {
          console.log("Failed to fetch movies");
          setError("Failed to fetch movies");
        } else {
          console.log("Fetched categories with movies:", response);
          setCategoriesWithMovies(response);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setError("An error occurred while fetching movies.");
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesCategories();
  }, [auth]);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }
  return (
    <div>
      <h2 className="mb-1">Random Movie</h2>
      <RandomVideo categories={categoriesWithMovies} />
      <h2 className="mb-1">Movies</h2>
      <CategoryLists categories={categoriesWithMovies} />
    </div>
  );
};

const randomChoice = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const RandomVideo = ({ categories }) => {
  const randomMovie = randomChoice(
    Object.values(categories).flatMap((category) => category.movies)
  );
  return (
    <div>
      <h4>{randomMovie.name}</h4>
      <p>{randomMovie.description}</p>
      <VideoPlayer
        src={randomMovie.filePath}
        key={randomMovie.filePath}
        autoPlay
      />
    </div>
  );
};
