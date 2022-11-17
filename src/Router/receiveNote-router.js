const express = require('express');
const {ReceiveNoteController} = require('./../Controller');

const router = express.Router();
const receiveNoteController = new ReceiveNoteController();

router.get('/saved', receiveNoteController.getStoreRoom);
router.post('/addNote', receiveNoteController.addNote);
router.get('/:id',receiveNoteController.getNoteByID);
router.get('/many/:date',receiveNoteController.getNotesByDate);

module.exports = router;