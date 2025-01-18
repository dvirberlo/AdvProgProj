import { NavLink } from "react-router"; // Make sure you are using "react-router-dom"
import { routes } from "../../Pages/AppRouter";

export const UnRegisteredHomePage = () => {
  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      {/* Header Section with Logo and Sign-In Button */}

      <div className="d-flex justify-content-between sticky-top">
        <div className="ms-5 mt-3 logo-custom">
          <h1 className="logo">OUR LOGO</h1>
        </div>
        <div className="me-4 mt-3">
          {/* Use NavLink as a button */}
          <NavLink to={routes.Login}>
            <button type="button" className="btn btn-danger ps-4 pe-4">
              Sign In
            </button>
          </NavLink>
        </div>
      </div>

      {/* Centered Content */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="text-center">
          <h1 className="heading-custom fw-bold">
            Unlimited movies, TV <br /> shows and more.
          </h1>
          <h4 className="mt-3">Starts at free.</h4>
          <p className="fw-bold">Ready to watch? Enter here to sign up.</p>

          {/* "Sign Up" Button */}
          <div className="mt-4">
            <NavLink to={routes.Signup}>
              <button type="button" className="btn btn-danger ps-4 pe-4">
                Sign Up
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
