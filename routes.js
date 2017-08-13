module.exports = function (app) {

  var express = require('express');
  var router = express.Router();

  /**
   * routes
   */
  var NoteController = require('./note/NoteController');
  router.use('/notes', NoteController);

  /**
   * default error handling
   */
  function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).send(err.message);
  }
  router.use(errorHandler);

  /**
   * default root route for api
   */
  app.use('/api', router);
  app.get('/api', (req, res, next) => res.status(200).send('Api Works.'));

}