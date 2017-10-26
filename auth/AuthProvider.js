const User = require(__root + 'user/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs-then');

module.exports = function (app) {

  return {
    login,
    register,
    me,
    asyncMe
  };

  function signToken(id) {
    return jwt.sign({ id: id }, app.config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  function login(req, res, next) {

    const _user = {};
    return User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) return Promise.reject(new Error('User with that email does not exits.'));
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

    // Add email check before register
    // If email exists redirect to the login page

    if (!(req.body.password && 
        req.body.password.length >= 7))
      return next(new Error('Password error. Password needs to be longer than 8 characters.'));

    if (!(req.body.name && 
        req.body.name.length > 5 && 
        typeof req.body.name === 'string'))
      return next(new Error('Username error. Username needs to longer than 5 characters'));

    if (!(req.body.email && 
        validateEmail(req.body.email) &&
        typeof req.body.name === 'string'))
      return next(new Error('Email error. Email must have valid characters.'));    
    
    return bcrypt.hash(req.body.password, 8)
      .then(hash => User.create({ name: req.body.name, email: req.body.email, password: hash }))
      .then(user => res.status(200).send({ auth: true, token: signToken(user._id) }))
      .catch(err => next(new Error(err)));
  }

  function me(req, res, next) {
    return User.findById(req.userId, { password: 0 })
      .then(user => !user ? 
        res.status(404).send('No user found.') :
        res.status(200).send(user))
      .catch(err => next(new Error(err)));
  }

  async function asyncMe(req, res, next) {
    try {
      let user = await User.findById(req.userId, { password: 0 });
      res.status(200).send(user);
    } catch (e) { next(e); } 
  }

};