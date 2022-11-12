const express = require('express');
const {UserController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');

const router = express.Router();
const userController = new UserController();

// add middleware check is user
router.post('/signup', authorizationMDW.checkPermission, userController.signUp);
router.put('/change-password', authorizationMDW.checkUser, userController.sendOtpForChangingPassword);
router.post('/change-password', authorizationMDW.checkUser, userController.vertifyOtpForChangingPassword);
router.get('/profile', authorizationMDW.checkUser, userController.getProfile)
router.post('/profile', authorizationMDW.checkUser, userController.updateProfile);
router.post('/logout', authorizationMDW.checkUser, userController.logout);

module.exports = router;