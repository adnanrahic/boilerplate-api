var User = require('./User');
module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  getUser: getUser,
  deleteUser: deleteUser,
  putUser: putUser
}

function createUser(req, res, next) {
  return User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => res.status(200).send(user))
    .catch(err => next(new Error(err)));
}

function getUsers(req, res, next) {
  return User.find({})
    .then(users => res.status(200).send(users))
    .catch(err => next(new Error(err)));
}

function getUser(req, res, next) {
  return User.findById(req.params.id)
    .then(user => {
      if (!user) return res.send(404).send('No user found.');
      res.status(200).send(user);
    })
    .catch(err => next(new Error(err)));
}

function deleteUser(req, res, next) {
  return User.findByIdAndRemove(req.params.id)
    .then(user => res.status(200).send(user))
    .catch(err => next(new Error(err)));
}

function putUser(req, res, next) {
  return User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => res.status(200).send(user))
    .catch(err => next(new Error(err)));
}