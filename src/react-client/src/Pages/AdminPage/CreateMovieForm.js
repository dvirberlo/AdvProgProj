import { useState } from "react";
import {
  TextInput,
  FileInput,
  TextareaInput,
  NumberInput,
} from "../../Components/FormInputs/FormInputs";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { TOKEN_ID_HEADER, WebServerURL } from "../../Constants/http";
import { CategoriesSelect } from "../../Components/Categories/CategoriesSelect";

export const CreateMovieForm = () => {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onVideoUpload = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch(`${WebServerURL}/api/movies`, {
      method: "POST",
      body: formData,
      headers: {
        [TOKEN_ID_HEADER]: token,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          setError("");
          setSuccess(true);
          event.target.reset();
        } else if (response.status === 409) {
          setError("Movie already exists");
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
    <form onSubmit={onVideoUpload} encType="multipart/form-data">
      <legend>Create Movie</legend>
      <TextInput name="name" text="Name" maxLength={50} required />
      <TextareaInput
        name="description"
        text="Description"
        maxLength={200}
        required
      />
      <NumberInput name="length" text="Length" required min={0} />
      <NumberInput name="rating" text="Rating" required min={0} max={5} />
      <NumberInput name="releaseYear" text="Release Year" required />
      <MovieCategoriesInput />
      <FileInput name="movieFile" text="Movie File" accept="video/*" required />
      <FileInput
        name="thumbnailFile"
        text="Thumbnail File"
        accept="image/*"
        required
      />
      <button type="submit" className="btn btn-danger">
        Submit
      </button>
      {error && <div className="my-2 alert alert-danger">{error}</div>}
      {success && <div className="my-2 alert alert-success">Movie created</div>}
    </form>
  );
};

const MovieCategoriesInput = () => {
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const addCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  return (
    <div className="my-2">
      <div className="input-group">
        <CategoriesSelect
          onChange={(category) => setCategory(category)}
          label="Select a categories to add to movie"
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={addCategory}
        >
          <div className="d-flex">
            <span className="material-symbols-rounded">add</span>
          </div>
        </button>
      </div>
      <div className="my-2">
        {categories.map((category) => (
          <div key={category._id} className="badge bg-secondary m-1">
            <span>{category.name}</span>
            <button
              type="button"
              className="btn-close"
              onClick={() =>
                setCategories(categories.filter((c) => c._id !== category._id))
              }
            ></button>
            <input
              type="hidden"
              name="categories"
              value={category._id}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};
