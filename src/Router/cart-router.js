const express = require('express');
const {CartController} = require('./../Controller');
const {shoppingMDW} = require('./../Middleware');

const router = express.Router();
const cartController = new CartController();

router.get('/', shoppingMDW.addCookieAutomatically, cartController.getCart);
router.post('/', 
    shoppingMDW.addCookieAutomatically, 
    shoppingMDW.preventUserOnRushHour, 
    cartController.addGoodsToCart
);
router.delete('/', cartController.removeCart);
router.post('/:goodsId', shoppingMDW.addCookieAutomatically, cartController.updateGoodsOnCart);
router.put('/:goodsId', shoppingMDW.addCookieAutomatically, cartController.removeGoodsFromCart);

module.exports = router;