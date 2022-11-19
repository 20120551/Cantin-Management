const express = require('express');
const {ScheduleController} = require('./../Controller');

const router = express.Router();
const scheduleController = new ScheduleController();

router.get('/', scheduleController.getAll);
router.get('/month', scheduleController.getMonth);
router.get('/date', scheduleController.getDate);
router.post('/create', scheduleController.assignment);
module.exports = router;