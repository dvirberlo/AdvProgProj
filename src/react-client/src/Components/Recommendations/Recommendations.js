import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { MovieList } from "../Movie/MovieList";
import {
  getRecommendations,
  postWatch,
} from "../../HttpRequest/recommendationHttp";

export const Recommendations = ({ id }) => {
  const { auth } = useAuth();

  const [recommendedMovies, setRecommendedMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    postWatch(auth.token, id).then(() => {
      getRecommendations(auth.token, id).then((data) => {
        if (data) setRecommendedMovies(data);
        else setError("Failed to fetch recommendations");
      });
    });
  }, [auth, id]);

  return (
    <div>
      <h2>Recommendations</h2>
      {error && <p>{error}</p>}
      {!error && recommendedMovies === null && <p>Loading...</p>}
      {recommendedMovies && recommendedMovies.length === 0 && (
        <p>No recommendations found</p>
      )}
      {recommendedMovies && recommendedMovies.length !== 0 && (
        <MovieList movies={recommendedMovies} />
      )}
    </div>
  );
};
