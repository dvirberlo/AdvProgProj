const mongoose = require("mongoose");

/**
 * Creates a custom validator for a Mongoose reference field.
 * This validator checks if the provided value corresponds to an existing document
 * in the specified model's collection.
 *
 * @param {mongoose.Model} model - The Mongoose model to validate the reference against.
 * @returns {Object} The Mongoose custom validator object.
 */
const documentReferenceValidator = (model) => {
  return {
    validator: async (value) => {
      try {
        const doc = await model.findOne({ _id: value });
        return doc != null;
      } catch (error) {
        return false;
      }
    },
    message: `A reference to ${model.name} was invalid.`,
  };
};

/**
 * Creates a custom validator for a Mongoose array of references.
 * This validator checks if all elements in the array correspond to existing documents
 * in the specified model's collection, and that there are no duplicates in the array.
 *
 * @param {mongoose.Model} model - The Mongoose model to validate the references against.
 * @returns {Object} The Mongoose custom validator object.
 */
const arrayReferenceValidator = (model) => {
  return {
    validator: async (array) => {
      if (array?.length === 0) return true;
      try {
        const count = await model.countDocuments({ _id: { $in: array } });
        return count === array.length;
      } catch (error) {
        return false;
      }
    },
    message: `One of the references to ${model.name} was invalid or was duplicated.`,
  };
};

module.exports = {
  documentReferenceValidator,
  arrayReferenceValidator,
};
