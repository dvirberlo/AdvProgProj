const express = require("express");

const UserController = require("../controllers/userController");

const UserRouter = express.Router();

UserRouter.route("/").post(
  UserController.userUploads,
  UserController.createUser
);
UserRouter.route("/:id").get(UserController.getUser);

module.exports = UserRouter;
