import { useState } from "react";

import "./HomePage.css";

export const HomePage = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      Home Page Component
      <button onClick={() => setCounter(counter + 1)}>
        Clicked #{counter} times
      </button>
    </div>
  );
};
