import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getMovieHttp } from "../../HttpRequest/getMovieHttp";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { routes } from "../../Pages/AppRouter";
import { VideoPlayer } from "../../Components/VideoPlayer/VideoPlayer";
import { Recommendations } from "../../Components/Recommendations/Recommendations";

export const MoviePage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not logged in, redirect to the landing page
    if (!auth.token) {
      navigate(routes.Landing);
    }
  }, [auth, navigate]);

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieHttp(auth.token, id)
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [auth, id]);
  return (
    <div className="container">
      {movie ? (
        <div>
          <h1>{movie.name}</h1>
          <p>{movie.description}</p>
          <VideoPlayer src={movie.filePath} key={movie.filePath} />
          <Recommendations id={id} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};
