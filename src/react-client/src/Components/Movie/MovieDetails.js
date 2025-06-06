import React from "react";
import "./MovieDetails.css";
import { StarRating } from "../Rating/StarRating";
import { ServerImage } from "../ServerMedia/ServerImage";
import { useNavigate } from "react-router";
import { routes } from "../../Pages/AppRouter";

export const MovieDetails = ({ movie, onClose }) => {
  const navigate = useNavigate();
  const watchClick = () => {
    navigate(routes.MoviePage + "/" + movie._id);
    onClose();
  };

  if (!movie) return null;

  return (
    <div
      className="modal fade show"
      id="movieModal"
      tabIndex="-1"
      aria-labelledby="movieModalLabel"
      aria-hidden="false"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="movieModalLabel">
              {movie.name}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-4">
                <ServerImage
                  src={movie.thumbnailPath}
                  alt={movie.name}
                  className="movie-picture-details"
                />
              </div>
              <div className="col-md-8">
                <p className="movie-details">
                  <strong>Description:</strong> {movie.description}
                </p>
                <div className="movie-details">
                  <strong>Rating:</strong> <StarRating rating={movie.rating} />
                </div>
                <p className="movie-details">
                  <strong>Year:</strong> {movie.releaseYear}
                </p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={watchClick}
            >
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
