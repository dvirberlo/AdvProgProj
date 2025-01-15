import React from "react";

export const MovieDetails = ({ movie }) => {
  return (
    <div className="container mt-5">
      <img
        src={movie.imageUrl}
        // will present if the image is not available
        //alt="Movie Thumbnail"
        className="img-fluid"
        style={{ width: "50%", height: "auto", cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target="#movieModal"
      />

      <div
        className="modal fade"
        id="movieModal"
        tabIndex="-1"
        aria-labelledby="movieModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="movieModalLabel">
                {movie.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={movie.imageUrl}
                    // will present if the image is not available
                    //alt="Movie Thumbnail"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-8">
                  <p>{movie.description}</p>
                  <p>Rating: {movie.rating}</p>
                  <p>Year: {movie.releaseDate}</p>
                  <p>Genre: {movie.genre}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-secondary">
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
