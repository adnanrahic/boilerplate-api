module.exports = function (app) {
  if (!app) throw new Error('Missing parameter: \'app\' not provided.');

  var express = require('express');
  var UserController = express.Router();
  var UserProvider = require('./UserProvider');
  var VerifyToken = require(__root + 'auth/VerifyToken')(app);

  // CREATES A NEW USER
  UserController.post('/', VerifyToken, UserProvider.createUser);

  // RETURNS ALL THE USERS IN THE DATABASE
  UserController.get('/', UserProvider.getUsers);

  // GETS A SINGLE USER FROM THE DATABASE
  UserController.get('/:id', UserProvider.getUser);

  // DELETES A USER FROM THE DATABASE
  UserController.delete('/:id', VerifyToken, UserProvider.deleteUser);

  // UPDATES A SINGLE USER IN THE DATABASE
  // Added VerifyToken middleware to make sure only an authenticated user can put to this route
  UserController.put('/:id', VerifyToken, UserProvider.putUser);

  return UserController;
  
};
