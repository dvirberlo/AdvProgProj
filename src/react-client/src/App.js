import { AppRouter } from "./Pages/AppRouter";
import { ThemeProvider } from "./Contexts/ThemeContext/ThemeContext";
import { AuthProvider } from "./Contexts/AuthContext/AuthContext";

import "material-symbols";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

export const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  );
};
