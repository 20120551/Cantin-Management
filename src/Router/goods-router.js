const express = require('express');
const {GoodsController} = require('./../Controller');
const { authorizationMDW } = require('./../Middleware');
const router = express.Router();
const goodsController = new GoodsController();

router.get('/storeroom',authorizationMDW.checkUser, goodsController.getStoreRoom);
router.post('/addGood', authorizationMDW.checkUser, goodsController.addGood);
router.get('/:id',authorizationMDW.checkUser, goodsController.getGoodByID);
router.post('/:id',authorizationMDW.checkUser, goodsController.updateGoodByID);
router.delete('/:id',authorizationMDW.checkUser, goodsController.deleteGoodByID);
router.get('/type/:dishType',authorizationMDW.checkUser, goodsController.getGoodsByType);

module.exports = router;