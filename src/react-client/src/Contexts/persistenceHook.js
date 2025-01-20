import { useState } from "react";

/**
 * A custom hook to persist state in local storage
 * @param {string} key The key to use in local storage
 * @param {any} initialValue The initial default value
 * @returns {[any, function]} A tuple containing the value and a function to set the value
 */
export function usePersistence(key, initialValue) {
  let init = null;
  if (localStorage.getItem(key)) {
    try {
      init = JSON.parse(localStorage.getItem(key));
    } catch (e) {}
  }
  if (init === null) {
    init = initialValue;
    localStorage.setItem(key, JSON.stringify(init));
  }
  const [value, setValue] = useState(init);

  const setAndStoreValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setAndStoreValue];
}
