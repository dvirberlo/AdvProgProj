import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";

export const routes = {
  Home: "/",
  Login: "/login",
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={routes.Home} element={<HomePage />} />
        <Route path={routes.Login} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
