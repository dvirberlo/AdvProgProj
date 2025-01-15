import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./HomePage/HomePage";
import { DummyPage } from "./SignupPage/SignupPage";

export const routes = {
  Home: "/",
  Signup: "/signup",
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={routes.Home} element={<HomePage />} />
        <Route path={routes.Signup} element={<DummyPage />} />
      </Routes>
    </BrowserRouter>
  );
};
