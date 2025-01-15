import { useState } from "react";
import { NavBarTemplate } from "../../Components/NavBar/NavBarTemplate";

export const HomePage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <NavBarTemplate>
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos harum
          similique odit, iusto aliquam earum numquam aliquid officiis nesciunt
          nulla quas voluptatem voluptates culpa. Rerum fugiat temporibus modi
          alias mollitia.
        </p>
      ))}
    </NavBarTemplate>
  );
};
