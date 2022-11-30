const express = require('express');
const { ReceiveNoteController } = require('./../Controller');
const { authorizationMDW } = require('./../Middleware');

const router = express.Router();
const receiveNoteController = new ReceiveNoteController();

router.get('/saved', authorizationMDW.checkPermission, receiveNoteController.getStoreRoom);
router.get('/saved/many/:date', authorizationMDW.checkPermission, receiveNoteController.getNotesByDate);
router.post('/addNote', authorizationMDW.checkPermission, receiveNoteController.addNote);
router.get('/:id', authorizationMDW.checkPermission, receiveNoteController.getNoteByID);

module.exports = router;