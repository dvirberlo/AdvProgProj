const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Use the correct variable here, and make sure it's defined:
const specialCategoryName = "Watched Movies";

// Define the Category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    minlength: 1,
    validate: [
      {
        validator: function (v) {
          return typeof v === "string";
        },
        message: "Name must be a string",
      },
      {
        validator: function (v) {
          return v !== specialCategoryName;
        },
        message: `Name cannot be ${specialCategoryName}`,
      },
    ],
  },
  promoted: {
    type: Boolean,
    default: false,
    validate: {
      validator: function (v) {
        return typeof v === "boolean";
      },
      message: "Promoted must be a boolean",
    },
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = { Category, specialCategoryName };
