import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./AppRouter/AppRouter";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
