import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { routes } from "../../Pages/AppRouter";
import { useTheme, DARK_THEME } from "../../Contexts/ThemeContext/ThemeContext";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";

import "./NavBar.css";
import { Roles } from "../../Constants/Roles";

export const NavBar = () => {
  const { auth, setAuth } = useAuth();
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-opacity-75 bg-body-tertiary backdrop-blur">
      <div className="container-fluid">
        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <a className="navbar-brand">NextFelix</a>
        <div className="ms-auto" />

        <div className="d-lg-none d-flex">
          <ColorModeToggle />
          <LogoutButton />
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <NavItem to={routes.Home} icon="home" text="Home" />
            {auth.role === Roles.Admin && (
              <NavItem
                to={routes.Admin}
                icon="admin_panel_settings"
                text="Admin"
              />
            )}
          </ul>

          <div className="ms-auto" />
          <NavSearchForm />
          <div className="ms-1" />

          <div className="d-none d-lg-flex">
            <ColorModeToggle />
            <LogoutButton />
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

const NavSearchForm = () => {
  // Store the typed search text
  const [searchValue, setSearchValue] = useState("");
  // Keep track of the route the user was on before starting to type
  const [previousRoute, setPreviousRoute] = useState(routes.Home);
  // use the navigate function to navigate to a new route
  const navigate = useNavigate();
  // use the useLocation hook to get the current
  const location = useLocation();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    // this is before we apply setSearchValue so this is the first char of the user input
    // so we store the previous route if the user is not on the search page
    if (searchValue === "" && value !== "" && location.pathname !== "/search") {
      setPreviousRoute(location.pathname);
    }

    setSearchValue(value);

    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`, {
        replace: true,
      });
    } else {
      navigate(previousRoute, { replace: true });
    }
  };

  // Handle pressing "Enter"
  const onKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`, {
        replace: true,
      });
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
        onChange={handleSearchChange}
        onKeyDown={onKeyDown}
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
const LogoutButton = () => {
  const { auth, setAuth } = useAuth();
  const logout = () => {
    setAuth({ token: null, _id: null, role: null });
  };
  return (
    <button className="btn d-flex" onClick={logout}>
      <span className="material-symbols-rounded me-1">logout</span>
      <span className="d-none d-md-block">Logout</span>
    </button>
  );
};
