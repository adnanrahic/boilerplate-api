module.exports = function (app) {
  if (!app) throw new Error('Missing parameter: \'app\' not provided.');  
  
  const express = require('express');
  const router = express.Router();
  const VerifyToken = require('./VerifyToken')(app);
  const AuthProvider = require('./AuthProvider')(app);

  const bodyParser = require('body-parser');
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.post('/login', AuthProvider.login);

  router.post('/register', AuthProvider.register);

  router.get('/me', VerifyToken, AuthProvider.me);
  
  router.get('/asyncMe', VerifyToken, AuthProvider.asyncMe);

  return router;

};
