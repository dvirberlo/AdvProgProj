const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define the Category schema
const categorySchema = new Schema({
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
module.exports = mongoose.model("Category", categorySchema);
