const express = require('express');
const {AuthController} = require('./../Controller');

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.put('/forgot-password', authController.sendOtpForForgetingPassword);
router.post('/verify-key', authController.vertifyOtpForForgetingPassword);
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;