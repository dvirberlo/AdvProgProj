import { NavBar } from "./NavBar";

export const NavBarTemplate = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};
