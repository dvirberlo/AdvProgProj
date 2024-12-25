const mongoose = require("mongoose");
const Category = mongoose.model("Category", categorySchema);
const Schema = mongoose.Schema;
// Define the Category schema
const Movie = new Schema({
  // we use name field
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    validate: {
      validator: function (v) {
        return typeof v === "string";
      },
      message: "Name must be a string",
    },
  },
  categories: {
    // Array of Category references
    type: [{ type: Schema.Types.ObjectId, ref: "Category" }], 
    default: [],
  },
  legacyId:{
    type: mongoose.Schema.Types.Int32,
    required: true,
    unique: true,
  }
});
module.exports = mongoose.model("Movie", Movie);
