var mongoose = require('mongoose')
var Note = require('./Note');

module.exports = {
  createNote: createNote,
  getNotes: getNotes
}

function createNote(req, res, next) {
  return Note.create({
      title : req.body.title,
      description : req.body.description,
      pinned : req.body.pinned
    })
    .then((note) => res.status(200).send(note))
    .catch(err => next(new Error(err)));
}

function getNotes(req, res, next) {
  return Note.find({})
    .then(notes => res.status(200).send(notes))
    .catch(err => next(new Error(err)));
}