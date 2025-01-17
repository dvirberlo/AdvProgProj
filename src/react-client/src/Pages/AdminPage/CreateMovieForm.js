import { useState } from "react";
import {
  TextInput,
  FileInput,
  TextareaInput,
  NumberInput,
} from "../../Components/FormInputs/FormInputs";

export const CreateMovieForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onVideoUpload = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("http://localhost:3000/api/movies", {
      method: "POST",
      body: formData,
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
      <FileInput name="movieFile" text="Movie File" accept="video/*" required />
      <FileInput
        name="thumbnailFile"
        text="Thumbnail File"
        accept="image/*"
        required
      />
      {/* TODO: categories */}
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
