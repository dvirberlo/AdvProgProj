import React from "react";

import { useLocation, useNavigate } from "react-router";
export const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <h2>Something went wrong</h2>
      <p>
        Sorry, we couldn't find the page you were looking for.To return to the
        homepage click on the button below.
      </p>
      <button onClick={goHome} type="button" class="btn btn-outline-danger">
        Go homepage
      </button>
    </div>
  );
};
