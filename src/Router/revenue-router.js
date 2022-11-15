const express = require('express');
const {RevenueController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');

const router = express.Router();
const revenueController = new RevenueController();

//authorizationMDW.checkPermission
router.post('/', authorizationMDW.checkPermission, revenueController.getRevenueBetweenAInterval);
router.put('/create', authorizationMDW.checkPermission, revenueController.createRevenue);
router.get('/:id', authorizationMDW.checkPermission, revenueController.getRevenue);
module.exports = router;