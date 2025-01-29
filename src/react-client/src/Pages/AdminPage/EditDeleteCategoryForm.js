import { useState } from "react";
import {
  TextInput,
  CheckboxInput,
} from "../../Components/FormInputs/FormInputs";
import { CategoriesSelect } from "../../Components/Categories/CategoriesSelect";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { TOKEN_ID_HEADER, WebServerURL } from "../../Constants/http";

export const EditDeleteCategoryForm = () => {
  const emptyCategory = {
    _id: "",
    name: "",
    promoted: false,
  };
  const [category, setCategory] = useState(emptyCategory);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [refresh, setRefresh] = useState(0);

  const { auth } = useAuth();

  const onEdit = (form) => {
    fetch(`${WebServerURL}/api/categories/${category._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        [TOKEN_ID_HEADER]: auth.token,
      },
      body: JSON.stringify(category),
    }).then(async (response) => {
      if (response.ok) {
        setError("");
        setSuccess("Category updated successfully");
      } else {
        const data = await response.json();
        setError(data.error);
        setSuccess("");
        setCategory(emptyCategory);
      }
      setRefresh(refresh + 1);
    });
  };

  const onDelete = () => {
    fetch(`${WebServerURL}/api/categories/${category._id}`, {
      method: "DELETE",
      headers: {
        [TOKEN_ID_HEADER]: auth.token,
      },
    }).then(async (response) => {
      if (response.ok) {
        setError("");
        setSuccess("Category deleted successfully");
        setCategory(emptyCategory);
      } else {
        const data = await response.json();
        setError(data.error);
        setSuccess("");
      }
      setRefresh(refresh + 1);
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onEdit(event.target);
      }}
    >
      <legend>Edit & Delete Category</legend>
      <p></p>
      <CategoriesSelect
        onChange={(category) => setCategory(category)}
        label="Select a category to edit or delete"
        key={refresh}
      />
      {category.name && (
        <div className="mt-3">
          <TextInput
            name="name"
            text="Name"
            maxLength={20}
            required
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
          <CheckboxInput
            name="promoted"
            text="Promoted"
            checked={category.promoted}
            onChange={(e) =>
              setCategory({ ...category, promoted: e.target.checked })
            }
          />
          <button type="submit" className="btn btn-primary me-4">
            <div className="d-flex">
              <span className="material-symbols-rounded me-1">edit</span>
              <span>Edit</span>
            </div>
          </button>
          <button type="button" className="btn btn-danger" onClick={onDelete}>
            <div className="d-flex">
              <span className="material-symbols-rounded me-1">delete</span>
              <span>Delete</span>
            </div>
          </button>
        </div>
      )}
      {error && <div className="my-2 alert alert-danger">{error}</div>}
      {success && <div className="my-2 alert alert-success">{success}</div>}
    </form>
  );
};
