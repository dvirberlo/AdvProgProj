const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
var cors = require("cors");

const { PUBLIC_PATH } = require("./constants/paths");
const CategoryRouter = require("./routes/categoryRouter");
const MovieRouter = require("./routes/movieRouter");
const TokenRouter = require("./routes/tokenRouter");
const UserRouter = require("./routes/userRouter");

// Load environment variables (default to "local")
require("custom-env").env(process.env.NODE_ENV ?? "local", "./config");

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

const server = express();

server.use(cors());

server.use(express.urlencoded({ extended: true }));

server.use(express.json());

server.use(express.static(PUBLIC_PATH));

server.use("/api/categories", CategoryRouter);
server.use("/api/movies", MovieRouter);
server.use("/api/tokens", TokenRouter);
server.use("/api/users", UserRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
