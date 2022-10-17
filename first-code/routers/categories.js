const express = require('express');
const router = express.Router();
const categories_controller = require('../controllers/categories_controller');
const { verify_admin, verify_user } = require('../utils/verify_token');

//categories
router.get('/', verify_user, categories_controller.getCategories);
router.get('/:id', verify_admin, categories_controller.getCategoriesbyId);
router.post('/', verify_admin, categories_controller.postCategories);
router.put('/:id', verify_admin, categories_controller.updateCategories);
router.delete('/:id', verify_admin, categories_controller.deleteCategories);

module.exports = router;
