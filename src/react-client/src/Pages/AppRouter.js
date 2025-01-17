import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { AdminPage } from "./AdminPage/AdminPage";

export const routes = {
  Home: "/",
  Login: "/login",
  Admin: "/admin",
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={routes.Home} element={<HomePage />} />
        <Route path={routes.Login} element={<LoginPage />} />
        <Route path={routes.Admin} element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};
