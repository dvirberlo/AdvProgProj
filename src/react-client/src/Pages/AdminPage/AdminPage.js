import { CreateMovieForm } from "./CreateMovieForm";
import { CreateCategoryForm } from "./CreateCategoryForm";
import { EditDeleteMovieForm } from "./EditDeleteMovieForm";
import { EditDeleteCategoryForm } from "./EditDeleteCategoryForm";
import { TabsNav } from "../../Components/TabsNav/TabsNav";
import { useNavigate } from "react-router";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { routes } from "../../Pages/AppRouter";
import { useEffect } from "react";
import { Roles } from "../../Constants/Roles";

export const AdminPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not logged in or is not an admin, redirect to the home page
    if (!auth.token || auth.role !== Roles.Admin) {
      navigate(routes.Home);
    }
  }, [auth, navigate]);
  return (
    <div>
      <div className="container">
        <TabsNav
          tabs={[
            {
              name: "Create Movie",
              element: <CreateMovieForm />,
            },
            {
              name: "Edit & Delete Movie",
              element: <EditDeleteMovieForm />,
            },
            {
              name: "Create Category",
              element: <CreateCategoryForm />,
            },
            {
              name: "Edit & Delete Category",
              element: <EditDeleteCategoryForm />,
            },
          ]}
        />
      </div>
    </div>
  );
};
