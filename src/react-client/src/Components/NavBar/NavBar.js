import { NavLink } from "react-router";
import { routes } from "../../Pages/AppRouter";

import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-opacity-75 bg-body-tertiary backdrop-blur">
      <div className="container-fluid">
        <a className="navbar-brand">APP_NAME</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <NavItem to={routes.Home}>Home</NavItem>
            <NavItem to={routes.Signup}>Signup</NavItem>
          </ul>
          <div className="ms-auto" />
          <NavSearchForm />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ children, to }) => {
  return (
    <li className="nav-item px-2">
      <NavLink
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""} `}
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
};

const NavSearchForm = () => {
  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-2 focus-ring-secondary focus-ring border-secondary"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-secondary" type="submit">
        Search
      </button>
    </form>
  );
};
