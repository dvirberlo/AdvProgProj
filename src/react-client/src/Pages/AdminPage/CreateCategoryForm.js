import { useState } from "react";
import {
  TextInput,
  CheckboxInput,
} from "../../Components/FormInputs/FormInputs";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { TOKEN_ID_HEADER, WebServerURL } from "../../Constants/http";

export const CreateCategoryForm = () => {
  const { auth } = useAuth();

  const [name, setName] = useState("");
  const [promoted, setPromoted] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`${WebServerURL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [TOKEN_ID_HEADER]: auth.token,
      },
      body: JSON.stringify({ name, promoted }),
    })
      .then(async (response) => {
        if (response.ok) {
          setError("");
          setSuccess(true);
          setName("");
          setPromoted(false);
        } else if (response.status === 409) {
          setError("Category already exists");
          setSuccess(false);
        } else {
          const data = await response.json();
          setError(data.error);
          setSuccess(false);
        }
      })
      .catch((error) => {
        setError("Server error");
        setSuccess(false);
        console.error("Error:", error);
      });
  };
  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <legend>Create Category</legend>
      <TextInput
        name="name"
        text="Name"
        maxLength={20}
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CheckboxInput
        name="promoted"
        text="Promoted"
        checked={promoted}
        onChange={(e) => setPromoted(e.target.checked)}
      />
      <button type="submit" className="btn btn-danger">
        Submit
      </button>
      {error && <div className="my-2 alert alert-danger">{error}</div>}
      {success && (
        <div className="my-2 alert alert-success">Category created</div>
      )}
    </form>
  );
};
