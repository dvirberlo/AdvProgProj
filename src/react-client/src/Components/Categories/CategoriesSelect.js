import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { getCategoriesHttp } from "../../HttpRequest/getCategoriesHttp";

export const CategoriesSelect = ({ onChange, label, ...props }) => {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesHttp(auth.token).then((response) => {
      if (response === null) {
        console.log("Failed to fetch categories");
      } else {
        console.log("Fetched categories:", response);
        setCategories(response);
      }
    });
  }, [auth]);

  const _onChange = (event) => {
    onChange(
      categories.find((category) => category._id === event.target.value)
    );
  };

  return (
    <div className="form-floating">
      <select
        onChange={_onChange}
        defaultValue={0}
        className="form-select"
        {...props}
      >
        <option value={0} disabled>
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {label && <label>{label}</label>}
    </div>
  );
};
