import React from "react";
import { CategoryList } from "./CategoryList";

// "categories" is an array of objects, each with ._id, .name, and .movies
export const CategoryLists = ({ categories }) => {
  return (
    <div>
      {categories.map((category) => (
        <CategoryList
          key={category?._id ?? "WATCHED_MOVIES"}
          categoryName={category.name}
          movies={category.movies}
        />
      ))}
    </div>
  );
};
