var mongoose = require('mongoose');
/**
 * need to plug in native promises to work with promises instead of callbacks
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/boilerplate-api', { useMongoClient: true });