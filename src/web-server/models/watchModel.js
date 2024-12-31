const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");
const Movie = require("./movieModel");
const watchSchema = new Schema({
  watcher: {
    // Reference to the user who watches the movie
    type: Schema.Types.ObjectId,
    ref: User.modelName,
    required: true,
  },
  movie: {
    // Reference to the movie being watched
    type: Schema.Types.ObjectId,
    ref: Movie.modelName,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Watch", watchSchema);
