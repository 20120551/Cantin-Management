const express = require('express');
const {ShoppingController} = require('./../Controller');

const router = express.Router();
const shoppingController = new ShoppingController();


module.exports = router;