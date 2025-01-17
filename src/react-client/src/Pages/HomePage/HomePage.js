import React, { useEffect, useState } from "react";
import { NavBarTemplate } from "../../Components/NavBar/NavBarTemplate";
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

  // Render loading state
  if (loading) {
    return (
      <div>
        <div className="container-fluid py-4">
          <h1 className="text-center mb-4">Netflix</h1>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div>
        <div className="container-fluid py-4">
          <h1 className="text-center mb-4">Netflix</h1>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Render the categories and movies
  return (
    <div>
      <div className="container-fluid py-4">
        <h1 className="text-center mb-4">Netflix</h1>
        <CategoryLists categories={categoriesWithMovies} />
      </div>
    </div>
  );
};
