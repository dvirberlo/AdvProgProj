import { NavBar } from "./NavBar";

export const NavBarTemplate = ({ children }) => {
  return (
    <div className="container-fluid">
      <NavBar />
      <div className="container">{children}</div>
    </div>
  );
};
