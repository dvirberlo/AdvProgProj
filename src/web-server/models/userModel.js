const mongoose = require("mongoose");
const { UserRoles, UserRoleValues } = require("./userRolesModel");

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
    default: UserRoles.User,
    enum: UserRoleValues,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
