var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var NoteProvider = require('./NoteProvider')
var validateNote = require('./validateNote');

router.use(bodyParser.urlencoded({ extended: true }));
var Note = require('./Note');

// CREATES A NEW NOTE
router.post('/', validateNote, NoteProvider.createNote);



// RETURNS ALL THE NOTES IN THE DATABASE
router.get('/', function (req, res) {
    Note.find({}, function (err, notes) {
        if (err) return res.status(500).send("There was a problem finding the notes.");
        res.status(200).send(notes);
    });
});

// GETS A SINGLE NOTE FROM THE DATABASE
router.get('/:id', function (req, res) {
    Note.findById(req.params.id, function (err, note) {
        if (err) return res.status(500).send("There was a problem finding the note.");
        if (!note) return res.status(404).send("No note found.");
        res.status(200).send(note);
    });
});

// DELETES A NOTE FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Note.findByIdAndRemove(req.params.id, function (err, note) {
        if (err) return res.status(500).send("There was a problem deleting the note.");
        res.status(200).send(note);
    });
});

// UPDATES A SINGLE NOTE IN THE DATABASE
router.put('/:id', function (req, res) {
    Note.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, note) {
        if (err) return res.status(500).send(err);
        res.status(200).send(note);
    });
});


module.exports = router;