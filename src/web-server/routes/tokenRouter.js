const express = require("express");

const TokenController = require("../controllers/tokenController");

const TokenRouter = express.Router();

TokenRouter.route("/").post(TokenController.getToken);

module.exports = TokenRouter;
