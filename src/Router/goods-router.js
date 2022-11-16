const express = require('express');
const {GoodsController} = require('./../Controller');

const router = express.Router();
const goodsController = new GoodsController();

router.get('/storeroom', goodsController.getStoreRoom);
router.post('/addGood', goodsController.addGood);
router.get('/good/:id',goodsController.getGoodByID);
router.post('/update/:id',goodsController.updateGoodByID);

module.exports = router;