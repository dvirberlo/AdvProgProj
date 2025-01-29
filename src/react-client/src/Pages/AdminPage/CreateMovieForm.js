import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { TOKEN_ID_HEADER, WebServerURL } from "../../Constants/http";
import { MovieForm } from "../../Components/Movie/MovieForm";

export const CreateMovieForm = () => {
  const { auth } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onVideoUpload = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch(`${WebServerURL}/api/movies`, {
      method: "POST",
      body: formData,
      headers: {
        [TOKEN_ID_HEADER]: auth.token,
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
    <div>
      <MovieForm onSubmit={onVideoUpload} title="Create Movie" />
      {error && <div className="my-2 alert alert-danger">{error}</div>}
      {success && <div className="my-2 alert alert-success">Movie created</div>}
    </div>
  );
};
