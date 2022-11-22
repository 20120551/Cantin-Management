const express = require('express');
const PaymentThirdParty = require('./../Pattern/State');
const { OrderController } = require('./../Controller');
const { authorizationMDW, shoppingMDW } = require('./../Middleware');
const router = express.Router();
const paymentThirdParty = new PaymentThirdParty();
const orderController = new OrderController(paymentThirdParty);

router.post('/create', orderController.createOrder);
router.post('/:orderId', authorizationMDW.checkUser, orderController.updateOrderState);
router.delete('/:orderId', orderController.deleteOrder);
router.get('/result/:result', shoppingMDW.checkPayment, orderController.orderResult);
router.get('/:orderId', orderController.getOrderById);
router.post('/', authorizationMDW.checkUser, orderController.getOrderByDate);

module.exports = router;