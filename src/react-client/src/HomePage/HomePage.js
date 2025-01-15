import { useState } from "react";

import "./HomePage.css";

export const HomePage = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="container">
      <h1 className="text-center">Home Page Component</h1>
      <button
        onClick={() => setCounter(counter + 1)}
        className="btn btn-primary"
      >
        Clicked #{counter} times
      </button>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>Holy guacamole!</strong> You should check in on some of those
        fields below.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};
