module.exports = function (app) {

  const express = require('express');
  const router = express.Router();

  /**
   * routes
   */
  const NoteController = require('./note/NoteController');
  router.use('/notes', NoteController);

  const AuthController = require('./auth/AuthController')(app);
  router.use('/auth', AuthController);

  const UserController = require('./user/UserController');
  router.use('/users', UserController);

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