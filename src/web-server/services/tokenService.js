const mongoose = require("mongoose");

const User = require("../models/userModel");

/**
 *
 * @param {String?} username
 * @param {String?} password
 * @returns User's id as ObjectId with the specified username and password, or null if doesn't exist
 * @throws on DB connection errors
 */
const getToken = async (username, password) => {
  const user = await User.findOne({ username: username, password: password });
  if (!user) return null;
  return user._id;
};

module.exports = {
  getToken,
};
