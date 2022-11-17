const express = require('express');
const {DeliveryNoteController} = require('./../Controller');

const router = express.Router();
const deliveryNoteController = new DeliveryNoteController();

router.get('/saved', deliveryNoteController.getStoreRoom);
router.post('/addNote', deliveryNoteController.addNote);
router.get('/:id',deliveryNoteController.getNoteByID);
router.get('/many/:date',deliveryNoteController.getNotesByDate);

module.exports = router;