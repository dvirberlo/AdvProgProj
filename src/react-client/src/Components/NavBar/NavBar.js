import { NavLink } from "react-router";
import { routes } from "../../Pages/AppRouter";

import "./NavBar.css";
import { useState } from "react";
import { getMode, toggleMode, COLOR_DARK } from "./ColorMode";

export const NavBar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-opacity-75 bg-body-tertiary backdrop-blur">
      <div className="container-fluid">
        <a className="navbar-brand">APP_NAME</a>
        <div className="ms-auto" />
        <div className="d-lg-none">
          <ColorModeToggle />
        </div>
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
            <NavItem to={routes.Home} icon="home" text="Home" />
            <NavItem to={routes.Login} icon="login" text="Login" />
          </ul>
          <div className="ms-auto" />
          <NavSearchForm />
          <div className="ms-1" />
          <div className="d-none d-lg-block">
            <ColorModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, icon, text }) => {
  return (
    <li className="nav-item px-2">
      <NavLink
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""} `}
        to={to}
      >
        <div className="d-flex">
          {icon !== undefined && (
            <span className="material-symbols-rounded me-1">{icon}</span>
          )}
          <span>{text}</span>
        </div>
      </NavLink>
    </li>
  );
};

const NavSearchForm = () => {
  return (
    <div className="input-group w-auto">
      <input
        className="form-control focus-ring-secondary focus-ring border-secondary"
        type="search"
        placeholder="Search something..."
        aria-label="Search"
      />
      <button className="btn btn-outline-secondary d-flex" type="button">
        <span className="material-symbols-rounded me-1">search</span>
        Search
      </button>
    </div>
  );
};

const ColorModeToggle = () => {
  const [colorMode, _setColorMode] = useState(getMode());

  const toggleColorMode = (colorMode) => {
    _setColorMode(toggleMode(colorMode));
  };

  return (
    <button className="btn d-flex" onClick={toggleColorMode}>
      <span className="material-symbols-rounded">
        {colorMode === COLOR_DARK ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
};
