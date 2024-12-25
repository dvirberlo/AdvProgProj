const express = require('express');
var router = express.Router();
const movieController = require('../controllers/categoryController');
// Get all movies and create a new movie
router.route('/').get(movieController.getCategories)
    .post(movieController.createCategory);
// Modify one category based on its ID
router.route('/:id').get(movieController.getCategoryById)
    .patch(movieController.updateCategory)
    .delete(movieController.deleteCategory);
module.exports = router;