const User = require(__root + 'user/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs-then');

module.exports = function (app) {

  return {
    login: login,
    register: register
  }

  function signToken(id) {
    return jwt.sign({ id: id }, app.config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  function login(req, res, next) {

    const _user = {};
    return User.findOne({ email: req.body.email })
      .then(user => {
        _user._id = user._id;
        return user.password;
      })
      .then(userPassword => bcrypt.compare(req.body.password, userPassword))
      .then(passwordIsValid => passwordIsValid 
        ? signToken(_user._id) 
        : Promise.reject(new Error({ auth: false, token: null, message: 'The credentials do not match.' })))
      .then(token => res.status(200).send({ auth: true, token: token }))
      .catch(err => next(err));

  }

  function register(req, res, next) {

    if (!(req.body.password && 
        req.body.password.length >= 8))
      return res.status(400).send('Password error. Password needs to be longer than 8 characters.');

    if (!(req.body.name && 
        req.body.name.length > 5 && 
        typeof req.body.name === 'string'))
      return res.status(400).send('Username error. Username needs to longer than 5 characters');

    if (!(req.body.email && 
        validateEmail(req.body.email) &&
        typeof req.body.name === 'string'))
      return res.status(400).send('Email error. Email must have valid characters.');    
    
    return bcrypt.hash(req.body.password, 8)
      .then(hash => User.create({ name: req.body.name, email: req.body.email, password: hash }))
      .then(user => res.status(200).send({ auth: true, token: signToken(user._id) }))
      .catch(err => next(new Error(err)));
  }
}