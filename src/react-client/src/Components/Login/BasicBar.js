import React from "react";
import { NavLink } from "react-router";
import { routes } from "../../Pages/AppRouter";

export const BasicBar = ({ children, showSignIn = false }) => {
  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      {/* Header Section with Logo */}
      <div className="d-flex justify-content-between sticky-top">
        <div className="ms-5 mt-3 logo-custom">
          <h1 className="logo">OUR LOGO</h1>
        </div>

        {/* Conditionally Render Sign In Button */}
        {showSignIn && (
          <div className="me-4 mt-3">
            <NavLink to={routes.Login}>
              <button type="button" className="btn btn-danger ps-4 pe-4">
                Sign In
              </button>
            </NavLink>
          </div>
        )}
      </div>

      {/* Children Section */}
      <div>{children}</div>
    </div>
  );
};
