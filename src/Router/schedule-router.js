const express = require('express');
const {ScheduleController} = require('./../Controller');
const { authorizationMDW } = require('./../Middleware');
const router = express.Router();
const scheduleController = new ScheduleController();

router.get('/', scheduleController.getAll);
router.get('/month',authorizationMDW.checkUser, scheduleController.getMonth);
router.get('/date',authorizationMDW.checkUser, scheduleController.getDate);
router.post('/create',authorizationMDW.checkPermission, scheduleController.assignment);
module.exports = router;