const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { arrayReferenceValidator } = require("./referenceValidator");
const { Category, WATCHED_MOVIES_NAME } = require("./categoryModel");
const movieSchema = new Schema({
  // we use name field
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    minlength: 1,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200,
  },
  /**
   * length in minutes
   */
  length: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  categories: {
    // Array of Category references
    type: [{ type: Schema.Types.ObjectId, ref: Category.modelName }],
    default: [],
    validate: [arrayReferenceValidator(Category)],
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  thumbnailPath: {
    type: String,
    required: true,
  },
  legacyId: {
    type: mongoose.Schema.Types.Int32,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("Movie", movieSchema);
