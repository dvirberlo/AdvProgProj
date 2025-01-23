import { CreateMovieForm } from "./CreateMovieForm";
import { CreateCategoryForm } from "./CreateCategoryForm";
import { EditMovieForm } from "./EditMovieForm";
import { EditDeleteCategoryForm } from "./EditDeleteCategoryForm";
import { DeleteMovieForm } from "./DeleteMovieForm";
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
              name: "Edit Movie",
              element: <EditMovieForm />,
            },
            {
              name: "Delete Movie",
              element: <DeleteMovieForm />,
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
