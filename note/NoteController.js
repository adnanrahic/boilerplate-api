var express = require('express');
var NoteController = express.Router();
var NoteProvider = require('./NoteProvider')
var validateNote = require('./validateNote');

// CREATES A NEW NOTE
NoteController.post('/', validateNote, NoteProvider.createNote);

// RETURNS ALL THE NOTES IN THE DATABASE
NoteController.get('/', NoteProvider.getNotes);

// GETS A SINGLE NOTE FROM THE DATABASE
NoteController.get('/:id', function (req, res) {
    Note.findById(req.params.id, function (err, note) {
        if (err) return res.status(500).send("There was a problem finding the note.");
        if (!note) return res.status(404).send("No note found.");
        res.status(200).send(note);
    });
});

// DELETES A NOTE FROM THE DATABASE
NoteController.delete('/:id', function (req, res) {
    Note.findByIdAndRemove(req.params.id, function (err, note) {
        if (err) return res.status(500).send("There was a problem deleting the note.");
        res.status(200).send(note);
    });
});

// UPDATES A SINGLE NOTE IN THE DATABASE
NoteController.put('/:id', function (req, res) {
    Note.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, note) {
        if (err) return res.status(500).send(err);
        res.status(200).send(note);
    });
});


module.exports = NoteController;