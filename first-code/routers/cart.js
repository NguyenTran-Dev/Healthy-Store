const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart_controller');
const { verify_user } = require('../utils/verify_token');

router.post("/:user_id", verify_user, cartController.addItemToCart);
router.get("/:user_id", verify_user, cartController.getCart);
router.patch("/:user_id", verify_user, cartController.decreaseQuantity);
router.delete("/:user_id", verify_user, cartController.removeItem);

module.exports = router;
