const path = require("path");

const PUBLIC_DIR = "public";
const PUBLIC_PATH = path.join(__dirname, "..", PUBLIC_DIR);
/** path of uploads, relative to PUBLIC_DIR */
const UPLOADS_DIR = "uploads";
const UPLOADS_PATH = path.join(__dirname, "..", PUBLIC_DIR, UPLOADS_DIR);

module.exports = {
  PUBLIC_DIR,
  PUBLIC_PATH,
  UPLOADS_DIR,
  UPLOADS_PATH,
};
