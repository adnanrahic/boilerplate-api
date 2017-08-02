var mongoose = require('mongoose')
var Note = require('./Note');

module.exports = {
  createNote: createNote,
  getNotes: getNotes,
  getNote: getNote,
  deleteNote: deleteNote,
  putNote: putNote
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

function getNote(req, res, next) {
  return Note.findById(req.params.id)
    .then(note => {
      if (!note) return res.status(404).send("No note found.");
      res.status(200).send(note);
    })
    .catch(err => next(new Error(err)));
}

function deleteNote(req, res, next) {
  return Note.findByIdAndRemove(req.params.id)
    .then(note => res.status(200).send(note))
    .catch(err => next(new Error(err)));
}

function putNote(req, res, next) {
  return Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(note => res.status(200).send(note))
    .catch(err => next(new Error(err)));      
}