const express = require('express');
const {TimeKeepingController} = require('./../Controller');
const { authorizationMDW } = require('./../Middleware');
const router = express.Router();
const timeKeepingController = new TimeKeepingController();

router.get('/:id',authorizationMDW.checkUser, timeKeepingController.getStaffTK);
router.post('/check',authorizationMDW.checkUser, timeKeepingController.check);

module.exports = router;
