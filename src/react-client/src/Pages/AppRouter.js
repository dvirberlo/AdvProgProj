import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { AdminPage } from "./AdminPage/AdminPage";
import { SignupPage } from "./SignupPage/SignupPage";

export const routes = {
  Home: "/",
  Login: "/login",
  Admin: "/admin",
  Signup: "/signup",
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={routes.Home} element={<HomePage />} />
        <Route path={routes.Login} element={<LoginPage />} />
        <Route path={routes.Admin} element={<AdminPage />} />
        <Route path={routes.Signup} element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};
