const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')
const { userController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', userController.getAllUsers);
router.get('/logout', userController.logout);
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/forget-password', userController.forgetPassword);
router.post('/settings', authMiddleware, upload.single('avatar'), userController.updateSettings);

module.exports = router;
