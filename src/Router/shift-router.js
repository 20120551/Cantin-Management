const express = require('express');
const {ShiftController} = require('./../Controller');

const router = express.Router();
const shiftController = new ShiftController();

router.get('/', shiftController.getAll);
router.post('/create', shiftController.add);
module.exports = router;