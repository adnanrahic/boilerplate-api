var express = require('express');
var app = express();
var db = require('./db');

var NoteController = require('./note/NoteController');
app.use('/api/notes', NoteController);

module.exports = app;