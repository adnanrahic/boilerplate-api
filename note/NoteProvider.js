var mongoose = require('mongoose')
var Note = require('./Note');

module.exports = {
  createNote: createNote
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