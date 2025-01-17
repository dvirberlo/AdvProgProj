import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { AdminPage } from "./AdminPage/AdminPage";
import { SearchPage } from "./SearchPage/SearchPage";
import { NavBarTemplate } from "../Components/NavBar/NavBarTemplate";

export const routes = {
  Home: "/",
  Login: "/login",
  Admin: "/admin",
  SearchPage: "/search",
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
        </Routes>
      </NavBarTemplate>
    </BrowserRouter>
  );
};
