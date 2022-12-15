const express = require('express');
const { GoodsController } = require('./../Controller');
const { authorizationMDW } = require('./../Middleware');
const router = express.Router();
const goodsController = new GoodsController();

router.get('/storeroom', goodsController.getStoreRoom);
router.post('/addGood', authorizationMDW.checkUser, goodsController.addGood);
router.get('/:id', goodsController.getGoodByID);
router.post('/:id', authorizationMDW.checkUser, goodsController.updateGoodByID);
router.delete('/:id', authorizationMDW.checkUser, goodsController.deleteGoodByID);
router.get('/type/:dishType', goodsController.getGoodsByType);

module.exports = router;