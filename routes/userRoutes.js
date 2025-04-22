const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');

router.get('/', userController.getAllUsers);
router.get('/logout', userController.logout);
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/forget-password', userController.forgetPassword);
router.put('/change-password', userController.changePassword);


module.exports = router;
