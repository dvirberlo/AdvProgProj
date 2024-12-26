const express = require("express");
var router = express.Router();
const recommendController = require("../controllers/recommendController");

router
  .route("/")
  .get(recommendController.getRecommendations)
  .post(recommendController.addWatch);

module.exports = router;
