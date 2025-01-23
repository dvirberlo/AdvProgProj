import { useState } from "react";
import { TextInput } from "../../Components/FormInputs/FormInputs";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { TOKEN_ID_HEADER, WebServerURL } from "../../Constants/http";
import { MovieForm } from "../../Components/Movie/MovieForm";
import { getCategoryHttp } from "../../HttpRequest/getCategoryHttp";

export const EditDeleteMovieForm = () => {
  const { token } = useAuth();
  const [id, setId] = useState("");
  const [movie, setMovie] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onMovieDelete = (event) => {
    event.preventDefault();
    fetch(`${WebServerURL}/api/movies/${id}`, {
      method: "DELETE",
      headers: {
        [TOKEN_ID_HEADER]: token,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          setError("");
          setSuccess("Movie deleted");
          setMovie(null);
          setId("");
        } else {
          const data = await response.json();
          setError(data.error);
          setSuccess("");
        }
      })
      .catch((error) => {
        setError("Server error");
        setSuccess("");
        console.error("Error:", error);
      });
  };
  const onVideoUpload = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch(`${WebServerURL}/api/movies/${id}`, {
      method: "PATCH",
      body: formData,
      headers: {
        [TOKEN_ID_HEADER]: token,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          setError("");
          setSuccess("Movie edited");
          event.target.reset();
          setMovie(null);
          setId("");
        } else if (response.status === 409) {
          setError("Movie already exists");
          setSuccess("");
        } else {
          const data = await response.json();
          setError(data.error);
          setSuccess("");
        }
      })
      .catch((error) => {
        setError("Server error");
        setSuccess("");
        console.error("Error:", error);
      });
  };
  const fetchMovie = async (id) => {
    try {
      const response = await fetch(`${WebServerURL}/api/movies/${id}`, {
        headers: {
          [TOKEN_ID_HEADER]: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const populatedCategories = [];
        for (const categoryId of data.categories) {
          populatedCategories.push(await getCategoryHttp(token, categoryId));
        }
        data.categories = populatedCategories;
        setMovie(data);
        setError("");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("Server error");
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <TextInput
        name="id"
        text="Movie ID"
        required
        onChange={(event) => setId(event.target.value)}
      />
      <button
        className="btn btn-primary  me-4"
        onClick={() => fetchMovie(id)}
        disabled={!id}
      >
        <div className="d-flex">
          <span className="material-symbols-rounded me-1">edit</span>
          <span>Choose Movie</span>
        </div>
      </button>
      <button type="button" className="btn btn-danger" onClick={onMovieDelete}>
        <div className="d-flex">
          <span className="material-symbols-rounded me-1">delete</span>
          <span>Delete</span>
        </div>
      </button>
      {movie && (
        <MovieForm
          onSubmit={onVideoUpload}
          title="Edit Movie"
          defaultValue={movie}
        />
      )}
      {error && <div className="my-2 alert alert-danger">{error}</div>}
      {success && <div className="my-2 alert alert-success">{success}</div>}
    </div>
  );
};
