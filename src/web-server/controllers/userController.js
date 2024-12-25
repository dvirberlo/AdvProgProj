const express = require("express");
const mongoose = require("mongoose");

const UserService = require("../services/userService");

const DUPLICATE_KEY_ERROR_CODE = 11000;

/**
 * create a new user based on the specified field in request's body
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      req.body.password,
      req.body.image
    );
    return res.status(201).json(UserService.censoredUser(user));
  } catch (error) {
    if (
      error instanceof mongoose.Error.ValidationError ||
      (error instanceof mongoose.mongo.MongoError &&
        error?.code === DUPLICATE_KEY_ERROR_CODE)
    )
      return res.status(400).json({ error: error.message });

    console.error("userController: createUser internal error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
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
    return res.status(200).json(UserService.censoredUser(user));
  } catch (error) {
    console.error("userController: getUser internal error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getUser,
};
