import { createContext, useState, useContext, useEffect, Context } from "react";

const THEME_ATTRIBUTE = "data-bs-theme";

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

/**
 * @typedef {LIGHT_THEME | DARK_THEME} Theme
 */

/**
 * @param {Theme} theme
 * @returns {Theme}
 */
const getOppositeTheme = (theme) =>
  theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
/**
 * @param {Theme} theme
 */
const setDocumentTheme = (theme) => {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
};

/** @type {Context<{theme: Theme, toggleTheme: () => void}>} */
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeMode] = useState(LIGHT_THEME);

  useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeMode((prevTheme) => getOppositeTheme(prevTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
