const express = require('express');
const PaymentThirdParty = require('./../Pattern/State');
const {OrderController} = require('./../Controller');

const router = express.Router();
const paymentThirdParty = new PaymentThirdParty();
const orderController = new OrderController(paymentThirdParty);

router.post('/create', orderController.createOrder);
router.get('/:result', orderController.orderResult);

module.exports = router;