import React, { useEffect, useState } from "react";
import { CategoryLists } from "../../Components/Categories/CategoryLists";
import { getMoviesHttp } from "../../HttpRequest/getMoviesHttp";
import { useNavigate } from "react-router";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { routes } from "../../Pages/AppRouter";
import { VideoPlayer } from "../../Components/VideoPlayer/VideoPlayer";
import { ServerImage } from "../../Components/ServerMedia/ServerImage";
import { getUserHttp } from "../../HttpRequest/getUserHttp";

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
        <UserDashboard />
        <Movies />
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserHttp(auth.token, auth._id)
      .then((response) => {
        if (response === null) setError("Failed to fetch user");
        else setUser(response);
      })
      .catch((error) => {
        setError("An error occurred while fetching user.");
      });
  }, [auth]);

  return (
    <div className="container mt-2">
      {user && (
        <div className="row">
          <ServerImage
            src={user.image}
            alt="Profile Picture"
            className="col col-auto p-0"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div className="col">
            <h3>Welcome back, {user.firstName + " " + user.lastName}</h3>
            <span>
              @{user.username} (Role: {user.role})
            </span>
          </div>
        </div>
      )}
      {!user && !error && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
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
      <div className="mb-1"></div>
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
  if (!randomMovie) {
    return <p>No movies available</p>;
  }
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
