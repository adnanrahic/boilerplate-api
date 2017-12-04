var mongoose = require('mongoose');  
var NoteSchema = new mongoose.Schema({  
  title: String,
  description: String,
  pinned: { type: Boolean, default: false }
});
mongoose.model('Note', NoteSchema);

module.exports = mongoose.model('Note');