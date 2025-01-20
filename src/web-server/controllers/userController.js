const express = require("express");
const mongoose = require("mongoose");

const UserService = require("../services/userService");
const {
  getUploadedFilePath,
  uploadFieldsMiddleware,
} = require("./fileUploads");

const userFileFields = {
  image: "imageFile",
};
const userUploads = uploadFieldsMiddleware(Object.values(userFileFields));

const DUPLICATE_KEY_ERROR_CODE = 11000;

/**
 * create a new user based on the specified field in request's body
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = async (req, res) => {
  const imageFilePath = getUploadedFilePath(req, userFileFields.image);
  if (imageFilePath == null)
    return res.status(400).json({ error: "Please provide an image file." });

  try {
    const user = await UserService.createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      req.body.password,
      imageFilePath
    );
    return res.status(201).json(UserService.censoredUser(user.toJSON()));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ error: error.message });
    if (
      error instanceof mongoose.mongo.MongoError &&
      error?.code === DUPLICATE_KEY_ERROR_CODE
    )
      return res.status(409).json({ error: error.message });

    console.error("userController: createUser internal error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * send the user based on the specified id in request's params
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUser = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (user == null)
      return res
        .status(404)
        .json({ error: "The specified user id does not exist" });
    return res.status(200).json(UserService.censoredUser(user.toJSON()));
  } catch (error) {
    console.error("userController: getUser internal error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  userUploads,
  createUser,
  getUser,
};
