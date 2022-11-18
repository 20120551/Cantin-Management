const express = require('express');
const { DeliveryNoteController } = require('./../Controller');
const { authorizationMDW } = require('./../Middleware');

const router = express.Router();
const deliveryNoteController = new DeliveryNoteController();

router.get('/saved', authorizationMDW.checkUser, deliveryNoteController.getStoreRoom);
router.post('/saved', authorizationMDW.checkUser, deliveryNoteController.getNotesByDate);
router.post('/addNote', authorizationMDW.checkUser, deliveryNoteController.addNote);
router.get('/:id', authorizationMDW.checkUser, deliveryNoteController.getNoteByID);

module.exports = router;