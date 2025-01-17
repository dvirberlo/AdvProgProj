const mongoose = require("mongoose");
const { UserRoles, UserRoleValues } = require("./userRolesModel");

const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 20,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 20,
    validate: [
      {
        validator: (value) => specialCharactersRegex.test(value),
        message: "Password must include at least 1 special character.",
      },
    ],
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
    default: UserRoles.User,
    enum: UserRoleValues,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
