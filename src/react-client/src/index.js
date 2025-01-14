import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./AppRouter/AppRouter";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
