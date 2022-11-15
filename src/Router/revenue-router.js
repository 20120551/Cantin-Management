const express = require('express');
const {RevenueController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');

const router = express.Router();
const revenueController = new RevenueController();

//authorizationMDW.checkPermission
router.get('/', revenueController.getRevenueBetweenAInterval);
router.get('/:id', revenueController.getRevenue);

module.exports = router;