const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const User = require("../models/userModel");

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

/**
 *
 * @param {String?} token token string from client
 * @returns returns the matching user if the token is valid, otherwise null
 */
const verifyToken = async (token) => {
  if (!token) return null;
  try {
    const tokenData = jwt.verify(token, JWT_PRIVATE_KEY);
    console.log(tokenData);
    const userId = tokenData._id;
    const user = await UserService.getUserById(userId);
    return user;
  } catch (error) {
    return null;
  }
};

/**
 * @param {String?} username
 * @param {String?} password
 * @returns {mongoose.ObjectId | null} User's id as ObjectId with the specified username and password, or null if doesn't exist
 * @throws on DB connection errors
 */
const getUserId = async (username, password) => {
  const user = await User.findOne({ username: username, password: password });
  if (!user) return null;
  return user._id;
};

/**
 * @param {mongoose.ObjectId} userId
 * @returns {string | null} JWT string, or null if userId doesn't exist
 */
const createToken = async (userId) => {
  // check user exists
  if ((await UserService.getUserById(userId)) == null) return null;

  const token = jwt.sign({ _id: userId }, JWT_PRIVATE_KEY);
  return token;
};

module.exports = {
  getUserId,
  createToken,
  verifyToken,
};
