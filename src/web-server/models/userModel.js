const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    select: false,
  },
  legacyId: {
    type: mongoose.Schema.Types.Int32,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "https://robohash.org/DemoUserImage.png",
  },
  role: {
    type: String,
    required: true,
    default: "user",
    validate: {
      validator: function (v) {
        // allow only user and admin roles : to be more clear we do not present that field to the user he will be automatically assigned a user role
        // the admins will be added manually by the developers
        if (v === "user" || v === "admin") {
          return true;
        }
        return false;
      },
      message: (props) => `${props.value} is not a valid role!`,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
