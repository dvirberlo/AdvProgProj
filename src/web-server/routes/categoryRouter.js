const express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController');
// Get all categories and create a new category
router.route('/').get(categoryController.getCategories)
    .post(categoryController.createCategory);
// Modify one category based on its ID
router.route('/:id').get(categoryController.getCategoryById)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);
module.exports = router;