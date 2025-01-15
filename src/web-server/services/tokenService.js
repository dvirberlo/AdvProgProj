const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const { prettyFormat } = require("@testing-library/react");
/**
 *
 * @param {*} userId : the mongo id of the user
 * @returns : returning the user document if the token is valid, otherwise null
 */
const verifyToken = async (token) => {
  // Validate token
  if (!token) {
    return null;
  }
  // Validate token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (error) {
    //console.error("JWT verification failed:", error.message);
    return null;
  }

  return userDocument;
};

/**
 *
 * @param {*} userId : the mongo id of the user
 * @returns : the token (jwt) digital signature
 */
const createToken = async (userId) => {
  // Validate userId
  if (!mongoose.isValidObjectId(userId)) {
    return null;
  }

  // Check if the user exists
  const userDocument = await UserService.getUserById(userId);
  if (!userDocument) {
    return null;
  }
  const userData = userDocument.toJSON({ versionKey: false });
  const token = jwt.sign(userData, process.env.JWT_PRIVATE_KEY);
  return token;
};

module.exports = {
  createToken,
  verifyToken,
};
