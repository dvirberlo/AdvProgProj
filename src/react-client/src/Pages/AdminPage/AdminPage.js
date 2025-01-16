import { NavBarTemplate } from "../../Components/NavBar/NavBarTemplate";
import { CreateMovieForm } from "./CreateMovieForm";
import { CreateCategoryForm } from "./CreateCategoryForm";
import { EditMovieForm } from "./EditMovieForm";
import { EditCategoryForm } from "./EditCategoryForm";
import { DeleteMovieForm } from "./DeleteMovieForm";
import { DeleteCategoryForm } from "./DeleteCategoryForm";
import { TabsNav } from "../../Components/TabsNav/TabsNav";

export const AdminPage = () => {
  return (
    <NavBarTemplate>
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
              name: "Edit Category",
              element: <EditCategoryForm />,
            },
            {
              name: "Delete Category",
              element: <DeleteCategoryForm />,
            },
          ]}
        />
      </div>
    </NavBarTemplate>
  );
};
