const express = require('express');
const {UserController} = require('./../Controller');

const router = express.Router();
const userController = new UserController();

// add middleware check is user

router.post('/signup', userController.signUp);
router.put('/change-password', userController.sendOtpForChangingPassword);
router.post('/change-password', userController.vertifyOtpForChangingPassword);
router.put('/change-profile', userController.changeProfile);
router.post('/logout', userController.logout);

module.exports = router;