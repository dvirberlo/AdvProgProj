import React, { useState, useEffect } from "react";
import { PasswordMatchStatus } from "../../Components/Login/PasswordMatchStatus";
import { InputField } from "../../Components/Login/InputField";
import { FileInputField } from "../../Components/Login/FileInputField";
import { useNavigate } from "react-router";
import { routes } from "../../Pages/AppRouter";
import { NavLink } from "react-router";
import { BasicBar } from "../../Components/Login/BasicBar";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { WebServerURL } from "../../Constants/http";

export const SignupPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already logged in, redirect to the home page
    if (auth.token) {
      navigate(routes.Home);
    }
  }, [auth, navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [passwordMatch, setPasswordMatch] = useState(null);
  const [passwordComplexity, setPasswordComplexity] = useState(null);
  const [imageError, setImageError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const [maxLengthWarning, setMaxLengthWarning] = useState({
    firstName: false,
    lastName: false,
    username: false,
  });

  useEffect(() => {
    const { password, confirmPassword } = formData;
    if (password && confirmPassword !== "") {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(null);
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    setPasswordComplexity(passwordRegex.test(password));
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 20) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.length > 20,
    }));

    if (value.length === 20) {
      setMaxLengthWarning((prevWarnings) => ({
        ...prevWarnings,
        [name]: true,
      }));
    } else {
      setMaxLengthWarning((prevWarnings) => ({
        ...prevWarnings,
        [name]: false,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageError("");
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    } else {
      setImageError("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${WebServerURL}/api/users`, {
        method: "POST",
        body: new FormData(e.target),
      });

      if (response.status === 409) {
        setErrorMessage(
          "Username already exists. Please choose a different username."
        );
      } else if (response.ok) {
        navigate(routes.Login);
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Failed to connect to the server. Please try again later."
      );
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.username &&
      passwordMatch &&
      passwordComplexity &&
      formData.image &&
      !imageError
    );
  };

  return (
    <BasicBar showSignIn={false}>
      <h1 className="mt-2 mb-1 text-center">Sign Up</h1>

      <form
        className="mt-3 px-3 mx-auto"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="max 20 characters"
          maxLengthWarning={maxLengthWarning.firstName}
        />

        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="max 20 characters"
          maxLengthWarning={maxLengthWarning.lastName}
        />

        <InputField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="max 20 characters"
          maxLengthWarning={maxLengthWarning.username}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="8-20 length, must: letter, number, special"
          errorMessage={
            !passwordComplexity && formData.password
              ? "Password must meet the conditions"
              : ""
          }
        />

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter password"
        />

        <PasswordMatchStatus passwordMatch={passwordMatch} />

        <FileInputField
          label="Profile Image"
          name="imageFile"
          onChange={handleFileChange}
          errorMessage={imageError}
        />

        {/* Display error message if there is one */}
        {errorMessage && (
          <div
            className="alert alert-danger mt-3"
            style={{ fontSize: "0.8rem" }}
          >
            {errorMessage}
          </div>
        )}
        {/* submit button */}
        <div className="col-12 mt-4">
          <button
            className="btn btn-danger w-100"
            type="submit"
            disabled={!isFormValid()}
          >
            Sign Up
          </button>
        </div>

        {/* "Already signed up?" Link */}
        <div className="mt-2 text-center">
          <span style={{ fontSize: "0.9rem", color: "white" }}>
            Already signed up?{" "}
            <NavLink
              to={routes.Login}
              style={{ color: "lightblue", textDecoration: "none" }}
            >
              Click here to sign in
            </NavLink>
          </span>
        </div>
      </form>
    </BasicBar>
  );
};
