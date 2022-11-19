const express = require('express');
const PaymentThirdParty = require('./../Pattern/State');
const { OrderController } = require('./../Controller');
const { authorizationMDW } = require('./../Middleware');
const router = express.Router();
const paymentThirdParty = new PaymentThirdParty();
const orderController = new OrderController(paymentThirdParty);

router.post('/create', orderController.createOrder);
router.get('/result/:result', orderController.orderResult);
router.get('/:orderId', authorizationMDW.checkPermission, orderController.getOrderById);
router.get('/', authorizationMDW.checkPermission, orderController.getOrderByDate);

module.exports = router;