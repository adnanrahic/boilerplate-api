const expect = require('chai').expect;
const request = require('chai').request;

/**
 * Set up server and constants
 */
const app = mutil.getApp();
const User = mutil.getModel('User');
const parseJSON = mutil.parseJSON;

let token;
const testUser = {
  name: 'superAdmin',
  email: 'admin@example.com',
  password: 'superSecret'
};
const userWithInvalidEmail = {
  name: 'superAdmin',
  email: 'adminexamplecom',
  password: 'superSecret'
};
const userWithInvalidUsername = {
  name: 'super',
  email: 'admin@example.com',
  password: 'superSecret'
};
const userWithInvalidPassword = {
  name: 'super',
  email: 'admin@example.com',
  password: 'super'
};
let returnedUser = {};
function registerUserWithInvalidEmail() {
  return request(app)
    .post('/api/auth/asyncRegister')
    .send(userWithInvalidEmail);
}
function registerUserWithInvalidUsername() {
  return request(app)
    .post('/api/auth/asyncRegister')
    .send(userWithInvalidUsername);
}
function registerUserWithInvalidPassword() {
  return request(app)
    .post('/api/auth/asyncRegister')
    .send(userWithInvalidPassword);
}
function registerUser() {
  return request(app)
    .post('/api/auth/asyncRegister')
    .send(testUser);
}
function authUser() {
  return request(app)
    .post('/api/auth/login')
    .send(testUser);
}
function me(token) {
  return request(app)
    .get('/api/auth/me')
    .set('x-access-token', token)
    .then(res => res.body);
}
function asyncMe(token) {
  return request(app)
    .get('/api/auth/asyncMe')
    .set('x-access-token', token)
    .then(res => res.body);
}
function deleteUser(token) {
  return request(app)
    .get('/api/auth/asyncMe')
    .set('x-access-token', token)
    .then(res => res.body)
    .then(user => request(app)
      .delete('/api/users/' + user._id)
      .set('x-access-token', token));
}

describe('AuthController', function () {

  before(function () {
    return new Promise((resolve, reject) => {
      mutil.clearDB(function (err) {
        if (err)
          return reject(err);

        resolve();
      })
    })
  });
  after(function (done) {
    mutil.clearDB(function () {
      done();
    });
  });


  describe('AuthProvider', function () {

    describe('.register', function () {
      it('should not allow a user to register with an invalid email', function () {
        return registerUserWithInvalidEmail()
          .catch(err => {
            expect(err).to.have.status(500);
            expect(err).to.have.property('message');
            expect(err).to.have.property('stack');
          });
      });
      it('should not allow a user to register with an invalid username', function () {
        return registerUserWithInvalidUsername()
          .catch(err => {
            expect(err).to.have.status(500);
            expect(err).to.have.property('message');
            expect(err).to.have.property('stack');
          });
      });
      it('should not allow a user to register with an invalid password', function () {
        return registerUserWithInvalidPassword()
          .catch(err => {
            expect(err).to.have.status(500);
            expect(err).to.have.property('message');
            expect(err).to.have.property('stack');
          });
      });
      it('should register a new user', function () {
        return registerUser()
          .then(res => {

            expect(res).to.have.status(200);
            expect(res.body).to.not.be.null.and.not.to.be.undefined;
            expect(res.body).to.have.property('token');
            token = res.body.token;

            return token;

          })
          .then(me)
          .then(returnedUser => 
            User.findById(returnedUser._id, { password: 0 })
              .then(user => 
                expect(parseJSON(user)).to.eql(parseJSON(returnedUser))))
      });
      it('should not allow to register the same user twice', function () {
        return registerUser()
          .catch(err => {
            expect(err).to.have.status(500);
            expect(err).to.have.property('message');
            expect(err).to.have.property('stack');
          });
      });
    });

    describe('.login', function () {
      it('should authenticate a user', function () {
        return authUser()
          .then(res => {

            expect(res).to.have.status(200);
            expect(res.body).to.not.be.null.and.not.to.be.undefined;
            expect(res.body).to.have.property('token');
            token = res.body.token;

            return token;

          })
          .then(me)
          .then(returnedUser => User.findById(returnedUser._id, { password: 0 }).then(user => expect(parseJSON(user)).to.eql(parseJSON(returnedUser))))
          .catch(err => expect(err).to.be.null);
      });
    });

    describe('.me', function () {
      it('should return the authenticated user', function () {
        return me(token)
          .then(returnedUser => User.findById(returnedUser._id, { password: 0 })
            .then(user => expect(parseJSON(user)).to.eql(parseJSON(returnedUser))));
      });
    });

    describe('.asyncMe', function () {
      it('should return the authenticated user (written with async/await)', function () {
        return asyncMe(token)
          .then(returnedUser => User.findById(returnedUser._id, { password: 0 })
            .then(user => expect(parseJSON(user)).to.eql(parseJSON(returnedUser))));
      });
      it('should fail gracefully when no user exists with current token (written with async/await)', function () {
        return deleteUser(token)
          .then(() => asyncMe(token))
          .catch(err => {
            expect(err).to.have.status(404);
            expect(err).to.have.property('message');
            expect(err).to.have.property('stack');
          });
      });
    });
  });

  describe('VerifyToken', function () {
    it('should fail with 403 if \'no token provided\'', function () {
      return asyncMe('')
        .catch(err => {
          expect(err).to.have.status(403);
          expect(err).to.have.property('message');
          expect(err).to.have.property('stack');
        });
    });
    it('should fail with 500 if \'failed to authenticate token\'', function () {
      return asyncMe('somerandomtoken')
        .catch(err => {
          expect(err).to.have.status(500);
          expect(err).to.have.property('message');
          expect(err).to.have.property('stack');
        });
    });
  });
});