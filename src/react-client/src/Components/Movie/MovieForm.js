import { useState } from "react";
import {
  TextInput,
  FileInput,
  TextareaInput,
  NumberInput,
} from "../../Components/FormInputs/FormInputs";
import { CategoriesSelect } from "../../Components/Categories/CategoriesSelect";

const emptyMovie = {
  name: "",
  description: "",
  length: null,
  rating: null,
  releaseYear: null,
  categories: [],
  movieFile: null,
  thumbnailFile: null,
};

export const MovieForm = ({ defaultValue = emptyMovie, onSubmit, title }) => {
  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <legend>{title}</legend>
      <TextInput
        name="name"
        text="Name"
        maxLength={50}
        required
        defaultValue={defaultValue.name}
      />
      <TextareaInput
        name="description"
        text="Description"
        maxLength={200}
        required
        defaultValue={defaultValue.description}
      />
      <NumberInput
        name="length"
        text="Length"
        required
        min={0}
        defaultValue={defaultValue.length}
      />
      <NumberInput
        name="rating"
        text="Rating"
        required
        min={0}
        max={5}
        defaultValue={defaultValue.rating}
      />
      <NumberInput
        name="releaseYear"
        text="Release Year"
        required
        defaultValue={defaultValue.releaseYear}
      />
      <MovieCategoriesInput defaultValue={defaultValue.categories} />
      <FileInput name="movieFile" text="Movie File" accept="video/*" required />
      <FileInput
        name="thumbnailFile"
        text="Thumbnail File"
        accept="image/*"
        required
      />
      <button type="submit" className="btn btn-danger">
        Submit
      </button>
    </form>
  );
};

const MovieCategoriesInput = ({ defaultValue = [] }) => {
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(defaultValue);

  const addCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  return (
    <div className="my-2">
      <div className="input-group">
        <CategoriesSelect
          onChange={(category) => setCategory(category)}
          label="Select a categories to add to movie"
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={addCategory}
        >
          <div className="d-flex">
            <span className="material-symbols-rounded">add</span>
          </div>
        </button>
      </div>
      <div className="my-2">
        {categories.map((category) => (
          <div key={category._id} className="badge bg-secondary m-1">
            <span>{category.name}</span>
            <button
              type="button"
              className="btn-close"
              onClick={() =>
                setCategories(categories.filter((c) => c._id !== category._id))
              }
            ></button>
            <input
              type="hidden"
              name="categories"
              value={category._id}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};
