var mongoose = require('mongoose');  
var NoteSchema = new mongoose.Schema({  
  title: String,
  description: String,
  pinned: Boolean
});
mongoose.model('Note', NoteSchema);

module.exports = mongoose.model('Note');