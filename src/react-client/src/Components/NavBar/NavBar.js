import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { routes } from "../../Pages/AppRouter";
import { useTheme, DARK_THEME } from "../../Contexts/ThemeContext/ThemeContext";
import "./NavBar.css";

export const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (newValue) => {
    setSearchValue(newValue);
  };

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
            <NavItem
              to={routes.Admin}
              icon="admin_panel_settings"
              text="Admin"
            />
          </ul>

          <div className="ms-auto" />
          {/* Pass searchValue and handleSearchChange to NavSearchForm */}
          <NavSearchForm
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
          />
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
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        to={to}
      >
        <div className="d-flex">
          {icon && (
            <span className="material-symbols-rounded me-1">{icon}</span>
          )}
          <span>{text}</span>
        </div>
      </NavLink>
    </li>
  );
};

const NavSearchForm = ({ searchValue, handleSearchChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Keep track of the route the user was on before searching
  const [previousRoute, setPreviousRoute] = useState(routes.Home);

  // Handle pressing "Enter"
  const onKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`, {
        replace: true,
      });
    }
  };

  // Handle onChange of the input
  const onChange = (e) => {
    const value = e.target.value;

    // If we just started typing and are not on /search, record previous route
    if (searchValue === "" && value !== "" && location.pathname !== "/search") {
      setPreviousRoute(location.pathname);
    }

    // Update the parent's searchValue
    handleSearchChange(value);

    // Navigate to search or back to previous route based on the new value
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`, {
        replace: true,
      });
    } else {
      navigate(previousRoute, { replace: true });
    }
  };

  return (
    <div className="input-group w-auto">
      <input
        className="form-control focus-ring-secondary focus-ring border-secondary"
        type="search"
        placeholder="Search something..."
        aria-label="Search"
        value={searchValue}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <button
        className="btn btn-outline-secondary d-flex"
        type="button"
        onClick={() => {
          if (searchValue.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
          }
        }}
      >
        <span className="material-symbols-rounded me-1">search</span>
        Search
      </button>
    </div>
  );
};

const ColorModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="btn d-flex" onClick={toggleTheme}>
      <span className="material-symbols-rounded">
        {theme === DARK_THEME ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
};
