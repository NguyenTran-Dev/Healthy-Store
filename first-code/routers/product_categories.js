const express = require('express');
const router = express.Router();
const product_categories_controller = require('../controllers/product_categories_controller');
const { verify_admin } = require('../utils/verify_token');

router.get('/', verify_admin, product_categories_controller.getProductCategories);
router.get('/:id', verify_admin, product_categories_controller.getProductCategoriesbyId);
router.post('/', verify_admin, product_categories_controller.postProductCategories);
router.put('/:id', verify_admin, product_categories_controller.updateProductCategories);
router.delete('/:id', verify_admin, product_categories_controller.deleteProductCategories);

module.exports = router;
