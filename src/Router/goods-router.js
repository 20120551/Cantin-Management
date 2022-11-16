const express = require('express');
const {GoodsController} = require('./../Controller');

const router = express.Router();
const goodsController = new GoodsController();

router.get('/storeroom', goodsController.getStoreRoom);
router.post('/addGood', goodsController.addGood);
router.get('/:id',goodsController.getGoodByID);
router.post('/:id',goodsController.updateGoodByID);
router.delete('/:id',goodsController.deleteGoodByID);

module.exports = router;