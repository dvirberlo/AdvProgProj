const express = require('express');
var router = express.Router();
const recommendController = require('../controllers/recommendController');

router.route('/:id/recommend')
  .get(recommendController.getRecommendations)  
  .post(recommendController.addWatch);  

module.exports = router;