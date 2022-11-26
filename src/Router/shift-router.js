const express = require('express');
const {ShiftController} = require('./../Controller');
const { authorizationMDW } = require('./../Middleware');
const router = express.Router();
const shiftController = new ShiftController();

router.get('/', authorizationMDW.checkUser ,shiftController.getAll);
router.post('/create', authorizationMDW.checkPermission, shiftController.add);
module.exports = router;