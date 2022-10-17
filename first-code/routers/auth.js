const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const { verify_user } = require('../utils/verify_token');

router.post('/login', authController.loginHandler);
router.post('/register', authController.postUser);
router.put('/change-password/:id', verify_user, authController.changePassword);

module.exports = router;
