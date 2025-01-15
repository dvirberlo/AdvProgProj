const mongoose = require("mongoose");

const User = require("../models/userModel");

/**
 *
 * @param {String?} firstName
 * @param {String?} lastName
 * @param {String?} username
 * @param {String?} password
 * @param {String?} image
 * @return the new User model if user was successfully created, or null
 * @throws on DB connection errors or validation errors
 */
const createUser = async (
  firstName,
  lastName,
  username,
  password,
  image,
  role
) => {
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    legacyId: await getUniqueLegacyId(),
    image: image,
    // this field is validated in the model
    role: role,
  });
  return await user.save();
};

const getUniqueLegacyId = async () => {
  let legacyId;
  do {
    legacyId = getRandomInt32();
  } while ((await User.findOne({ legacyId: legacyId })) != null);
  return legacyId;
};

const getRandomInt32 = () => Math.floor(Math.random() * 2 ** 32) - 2 ** 31;

/**
 * @param {String?} id user id
 * @returns User model object with the specified id, or null if doesn't exist
 * @throws on DB connection errors
 */
const getUserById = async (id) => {
  if (!mongoose.isValidObjectId(id)) return null;
  return await User.findById(id);
};

/**
 * @param {User} user
 * @returns the same User object, without some specific censored fields.
 */
const censoredUser = (user) => {
  const excludeFields = ["password"];
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !excludeFields.includes(key))
  );
};

module.exports = {
  createUser,
  getUserById,
  censoredUser,
};
