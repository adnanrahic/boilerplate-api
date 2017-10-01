module.exports = function (app) {
  if (!app) throw new Error('Missing parameter: \'app\' not provided.');

  var express = require('express');
  var NoteController = express.Router();
  var NoteProvider = require('./NoteProvider')
  var validateNote = require('./validateNote');
  var VerifyToken = require(__root + 'auth/VerifyToken')(app);

  // CREATES A NEW NOTE
  NoteController.post('/', VerifyToken, validateNote, NoteProvider.createNote);

  // RETURNS ALL THE NOTES IN THE DATABASE
  NoteController.get('/', NoteProvider.getNotes);

  // GETS A SINGLE NOTE FROM THE DATABASE
  NoteController.get('/:id', NoteProvider.getNote);

  // DELETES A NOTE FROM THE DATABASE
  NoteController.delete('/:id', VerifyToken, NoteProvider.deleteNote);

  // UPDATES A SINGLE NOTE IN THE DATABASE
  NoteController.put('/:id', VerifyToken, NoteProvider.putNote);

  return NoteController;
}