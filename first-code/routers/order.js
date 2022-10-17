const express = require('express');
const router = express.Router();
const orderDetailsController = require('../controllers/order_details_controller');
const orderController = require('../controllers/order_controller');
const { verify_user } = require('../utils/verify_token');

//order details
router.get('/details', verify_user, orderDetailsController.getOrderDetails);
router.get('/details/:id', verify_user, orderDetailsController.getOrderDetailsById);
router.post('/details/', verify_user, orderDetailsController.postOrderDetails);
router.put('/details/:id', verify_user, orderDetailsController.updateOrderDetails);
router.delete('/details/:id', verify_user, orderDetailsController.deleteOrderDetails);

//order
router.get('/', verify_user, orderController.getOrders);
router.get('/:id', verify_user, orderController.getOrderbyId);
router.post('/', verify_user, orderController.postOrder);
router.put('/:id', verify_user, orderController.updateOrder);
router.delete('/:id', verify_user, orderController.deleteOrder);

module.exports = router;
