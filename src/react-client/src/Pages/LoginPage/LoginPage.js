import React, { useState } from "react";
import { InputField } from "../../Components/Login/InputField";
import { routes } from "../../Pages/AppRouter";
import { useNavigate } from "react-router-dom";
import { BasicBar } from "../../Components/Login/BasicBar";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate(); 

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
        const data = await response.json();
        console.log(data); 
        setError(""); 
        setIsLoggedIn(true); 
        console.log("Logged in successfully");
        const token = data.token;
        localStorage.setItem("token", token); 
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
    <BasicBar showSignIn={false}>

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
    </BasicBar>
  );
};
