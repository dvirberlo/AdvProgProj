const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// Load environment variables
require("custom-env").env(process.env.NODE_ENV, "./config");

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

const server = express();

server.use(express.urlencoded({ extended: true }));

server.use(express.json());

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
