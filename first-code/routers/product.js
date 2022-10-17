const express = require('express')
const router = express.Router()
const productController = require('../controllers/product_controller')
const { verify_admin, verify_token } = require('../utils/verify_token')

router.get('/', productController.getProducts)
router.get('/:id', productController.getProductbyId)
router.post('/', verify_admin, productController.postProduct)
router.put('/:id', verify_admin, productController.updateProduct)
router.delete('/:id', verify_admin, productController.deleteProduct)

module.exports = router
