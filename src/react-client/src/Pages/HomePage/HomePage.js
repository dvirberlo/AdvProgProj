import React, { useEffect, useState } from "react";
import { CategoryLists } from "../../Components/Categories/CategoryLists";
import { getMoviesHttp } from "../../HttpRequest/getMoviesHttp";
const demoToken = "67896ad97a9550763c011921";

export const HomePage = () => {
  // State variables to manage categories data, loading state, and errors
  const [categoriesWithMovies, setCategoriesWithMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // function to fetch data
    const fetchMoviesCategories = async () => {
      try {
        const response = await getMoviesHttp(demoToken);
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
  }, [demoToken]);

  return (
    <div>
      <div className="container-fluid py-4">
        <h1 className="text-center mb-4">Movie</h1>
        {loading && <div>Loading...</div>}
        {!loading && error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {!loading && !error && (
          <CategoryLists categoriesWithMovies={categoriesWithMovies} />
        )}
      </div>
    </div>
  );
};
