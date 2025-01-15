import { useState } from "react";
import { NavBarTemplate } from "../../Components/NavBar/NavBarTemplate";

export const HomePage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <NavBarTemplate>
      <div className="container">
        <h1 className="text-center">Home Page</h1>
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
        {Array.from({ length: 20 }).map((item) => (
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        ))}
      </div>
    </NavBarTemplate>
  );
};
