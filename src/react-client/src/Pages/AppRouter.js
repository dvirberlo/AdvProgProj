import { BrowserRouter, Route, Routes } from "react-router";
import { LandingPage } from "./LandingPage/LandingPage";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { AdminPage } from "./AdminPage/AdminPage";
import { SearchPage } from "./SearchPage/SearchPage";
import { NavBarTemplate } from "../Components/NavBar/NavBarTemplate";
import { ErrorPage } from "./ErrorPage/ErrorPage";
import { SignupPage } from "./SignupPage/SignupPage";
import { MoviePage } from "./MoviePage/MoviePage";

export const routes = {
  Landing: "/",
  Home: "/home",
  Login: "/login",
  Admin: "/admin",
  SearchPage: "/search",
  Error: "/*",
  Signup: "/signup",
  MoviePage: "/movie",
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBarTemplate>
        <Routes>
          <Route index path={routes.Landing} element={<LandingPage />} />
          <Route path={routes.Home} element={<HomePage />} />
          <Route path={routes.SearchPage} element={<SearchPage />} />
          <Route path={routes.Login} element={<LoginPage />} />
          <Route path={routes.Admin} element={<AdminPage />} />
          <Route path={routes.Error} element={<ErrorPage />} />
          <Route path={routes.Signup} element={<SignupPage />} />
          <Route path={routes.MoviePage + "/:id"} element={<MoviePage />} />
        </Routes>
      </NavBarTemplate>
    </BrowserRouter>
  );
};
