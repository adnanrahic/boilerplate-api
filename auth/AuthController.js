module.exports = function (app) {
  
  const express = require('express');
  const router = express.Router();
  const VerifyToken = require('./VerifyToken');
  const AuthProvider = require('./AuthProvider')(app);

  const bodyParser = require('body-parser');
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.post('/login', AuthProvider.login);

  router.post('/register', AuthProvider.register);

  router.get('/me', VerifyToken, function(req, res, next) {

    // add this to user provider
    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    });

  });

  return router;

}
