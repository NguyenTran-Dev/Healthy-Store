const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const { verify_user, verify_admin } = require('../utils/verify_token');

router.get('/', verify_admin, userController.getUsers);
router.get('/:id', verify_user, userController.getUserbyId);
router.put('/:id', verify_user, userController.updateUser);
router.delete('/:id', verify_admin, userController.deleteUser);

module.exports = router;
