import { NavBar } from "./NavBar";
import { useLocation } from "react-router";
import { routes } from "../../Pages/AppRouter";

export const NavBarTemplate = ({ children }) => {
  const { pathname } = useLocation();
  if (
    pathname === routes.Login ||
    pathname === routes.Signup ||
    pathname === routes.Landing
  ) {
    return <div data-bs-theme="light">{children}</div>;
  }
  return (
    <div>
      <NavBar />
      <div className="mt-1">{children}</div>
    </div>
  );
};
