import React, { useEffect, useState } from "react";
import { RegisteredHomePage } from "../HomePage/RegisteredHomePage";
import { UnRegisteredHomePage } from "../HomePage/UnRegisteredHomePage";

export const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false); // Set loading to false once the check is complete
  }, []);

  // Show loading state while checking the token
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isLoggedIn ? (
        // If there is a token, show the RegisteredHomePage content
        <RegisteredHomePage />
      ) : (
        // If there is no token, show the UnRegisteredHomePage content
        <UnRegisteredHomePage />
      )}
    </div>
  );
};
