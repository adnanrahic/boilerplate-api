var express = require('express');
var NoteController = express.Router();
var NoteProvider = require('./NoteProvider')
var validateNote = require('./validateNote');

// CREATES A NEW NOTE
NoteController.post('/', validateNote, NoteProvider.createNote);

// RETURNS ALL THE NOTES IN THE DATABASE
NoteController.get('/', NoteProvider.getNotes);

// GETS A SINGLE NOTE FROM THE DATABASE
NoteController.get('/:id', NoteProvider.getNote);

// DELETES A NOTE FROM THE DATABASE
NoteController.delete('/:id', NoteProvider.deleteNote);

// UPDATES A SINGLE NOTE IN THE DATABASE
NoteController.put('/:id', NoteProvider.putNote);

module.exports = NoteController;