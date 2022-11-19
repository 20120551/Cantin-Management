const express = require('express');
const {TimeKeepingController} = require('./../Controller');

const router = express.Router();
const timeKeepingController = new TimeKeepingController();

router.get('/:id', timeKeepingController.getStaffTK);
router.post('/check', timeKeepingController.check);

module.exports = router;
