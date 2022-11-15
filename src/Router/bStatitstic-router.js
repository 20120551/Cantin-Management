const express = require('express');
const {BStatisticController} = require('./../Controller');
const {authorizationMDW} = require('./../Middleware');

const router = express.Router();
const bStatisticController = new BStatisticController();

//authorizationMDW.checkPermission
router.post('/', authorizationMDW.checkPermission, bStatisticController.getBStatisticBetweenAInterval);
router.put('/create', authorizationMDW.checkPermission, bStatisticController.createBStatistic);
router.get('/:id', authorizationMDW.checkPermission, bStatisticController.getBStatistic);
module.exports = router;