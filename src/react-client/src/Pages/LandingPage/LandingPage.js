import React from "react";
import { NavLink } from "react-router";
import { routes } from "../../Pages/AppRouter";
import { BasicBar } from "../../Components/Login/BasicBar";

export const LandingPage = () => {
  return (
    <BasicBar showSignIn={true}>
      {/* Centered Content for UnRegistered Home Page */}
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{ height: "80vh" }}
      >
        <div>
          <h1 className="heading-custom fw-bold">
            Unlimited movies, TV <br /> shows and more.
          </h1>
          <h4 className="mt-3">Starts at free.</h4>
          <p className="fw-bold">Ready to watch? Enter here to sign up.</p>

          {/* Buttons for Sign Up */}
          <div className="mt-4">
            <NavLink to={routes.Signup}>
              <button type="button" className="btn btn-danger ps-4 pe-4">
                Sign Up
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </BasicBar>
  );
};
