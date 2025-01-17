// HomePage.js
import React, { useEffect, useState } from "react";
import { NavBarTemplate } from "../../Components/NavBar/NavBarTemplate";
import { CategoryLists } from "../../Components/Categories/CategoryLists";
import { getMoviesHttp } from "../../HttpRequest/getMoviesHttp";
import { useSearchParams } from "react-router"; 
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
export const HomePage = () => {
  // State variables to manage categories data, loading state, and errors
  const [categoriesWithMovies, setCategoriesWithMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    // function to fetch data
    const fetchMoviesCategories = async () => {
      try {
        const response = await getMoviesHttp(token);
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
  }, [userToken]); 

  // Render loading state
  if (loading) {
    return (
      <NavBarTemplate>
        <div className="container-fluid py-4">
          <h1 className="text-center mb-4">Netflix</h1>
          <div>Loading...</div>
        </div>
      </NavBarTemplate>
    );
  }

  // Render error state
  if (error) {
    return (
      <NavBarTemplate>
        <div className="container-fluid py-4">
          <h1 className="text-center mb-4">Netflix</h1>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </NavBarTemplate>
    );
  }

  // Render the categories and movies
  return (
    <NavBarTemplate>
      <div className="container-fluid py-4">
        <h1 className="text-center mb-4">Netflix</h1>
        <CategoryLists categories={categoriesWithMovies} />
      </div>
    </NavBarTemplate>
  );
};
