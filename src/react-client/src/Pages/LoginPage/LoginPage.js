import React, { useState } from "react";
import { InputField } from "../../Components/Login/InputField"; 
import { routes } from "../../Pages/AppRouter"; 
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // To store the error message
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to handle login success
  const navigate = useNavigate(); // React Router's hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 20) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const isFormValid = () => {
    return formData.username && formData.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the login data to send with fetch
    const loginData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json(); // Parse JSON data if response is OK
        console.log(data); // If necessary, log the response data
        setError(""); // Clear error if login is successful
        setIsLoggedIn(true); // Set the login status to true
        console.log("Logged in successfully");
        const token = data.token;
        localStorage.setItem("token", token); // Store the token in local storage
        navigate(routes.Home);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Username or password is incorrect");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      {/* Logo Section */}
      <div className="ms-5 mt-3 logo-custom" style={{ marginTop: "100px" }}>
        <h1 className="logo">OUR LOGO</h1>
      </div>

      {/* Login Title */}
      <h1 className="mt-5 text-center" style={{ marginTop: "50px" }}>
        Sign in
      </h1>

      {/* Login Form */}
      <form
        className="col-3 mt-4 px-3 mx-auto"
        style={{ maxWidth: "600px", marginTop: "60px" }}
        onSubmit={handleSubmit}
      >
        {/* Username Field */}
        <InputField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="user name"
          maxLength={20}
          style={{ marginTop: "20px" }}
        />

        {/* Password Field */}
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          style={{ marginTop: "20px" }}
        />

        {/* Display error message if there is one */}
        {error && (
          <div
            className="alert alert-danger mt-3"
            style={{ fontSize: "0.8rem" }}
          >
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="col-12 mt-4">
          <button
            className="btn btn-danger w-100"
            type="submit"
            disabled={!isFormValid()}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
