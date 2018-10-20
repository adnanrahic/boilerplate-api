module.exports = function (app) {

  var mongoose = require('mongoose');
  /**
   * need to plug in native promises to work with promises instead of callbacks
   */
  mongoose.Promise = global.Promise;
  mongoose.connect(app.config.db, { useNewUrlParser: true });
  
};