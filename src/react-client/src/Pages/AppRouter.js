import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { AdminPage } from "./AdminPage/AdminPage";
import { SearchPage } from "./SearchPage/SearchPage";
import { NavBarTemplate } from "../Components/NavBar/NavBarTemplate";
import { ErrorPage } from "./ErrorPage/ErrorPage";
import { SignupPage } from "./SignupPage/SignupPage";

export const routes = {
  Home: "/",
  Login: "/login",
  Admin: "/admin",
  SearchPage: "/search",
  Error: "/*",
  Signup: "/signup",
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBarTemplate>
        <Routes>
          <Route path={routes.SearchPage} element={<SearchPage />} />
          <Route index path={routes.Home} element={<HomePage />} />
          <Route path={routes.Login} element={<LoginPage />} />
          <Route path={routes.Admin} element={<AdminPage />} />
          <Route path={routes.Error} element={<ErrorPage />} />
          <Route path={routes.Signup} element={<SignupPage />} />
        </Routes>
      </NavBarTemplate>
    </BrowserRouter>
  );
};
