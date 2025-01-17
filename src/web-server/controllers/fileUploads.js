const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { UPLOADS_PATH, UPLOADS_DIR } = require("../constants/paths");

// create UPLOADS_PATH directory
if (!fs.existsSync(UPLOADS_PATH)) {
  fs.mkdirSync(UPLOADS_PATH, { recursive: true });
}

// configure Multer to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_PATH);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

/**
 * express middleware that uploads the file in the specified fields to the uploads directory
 * @param {Array<string>} fields
 */
const uploadFieldsMiddleware = (fields) => {
  return upload.fields(fields.map((field) => ({ name: field, maxCount: 1 })));
};

/**
 *
 * @param {express.Request} req
 * @param {string} field
 * @returns {string | null} the uploaded file's path, or null if the file was not received
 */
const getUploadedFilePath = (req, field) => {
  const file = req?.files?.[field]?.[0];
  if (file == null) return null;
  return "/" + UPLOADS_DIR + "/" + file.filename;
};

module.exports = {
  uploadFieldsMiddleware,
  getUploadedFilePath,
};
