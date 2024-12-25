const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const categoryRouter = require('./routes/categoryRouter');
const movieRouter = require('./routes/movieRouter');
// Load environment variables (default to "local")
require("custom-env").env(process.env.NODE_ENV ?? "local", "./config");

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

const server = express();

server.use(express.urlencoded({ extended: true }));

server.use(express.json());
server.use('/category', categoryRouter);
server.use('/movie', movieRouter);
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});