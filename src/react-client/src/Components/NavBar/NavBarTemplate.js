import { NavBar } from "./NavBar";
import { useLocation } from "react-router-dom";
export const NavBarTemplate = ({ children }) => {
  const { pathname } = useLocation();
  const pathRegex = /^(?!.*\/(?:login|admin|search|)$).*$/;
  console.log(pathname);
  if (pathRegex.test(pathname)) {
    return <div></div>;
  }
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};
