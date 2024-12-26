const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./categoryModel");
const movieSchema = new Schema({
  // we use name field
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    minlength: 1,
    validate: {
      validator: function (v) {
        return typeof v === "string";
      },
      message: "Name must be a string",
    },
  },
  categories: {
    // Array of Category references
    type: [{ type: Schema.Types.ObjectId, ref: Category.modelName }],
    default: [],
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  legacyId: {
    type: mongoose.Schema.Types.Int32,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("Movie", movieSchema);
