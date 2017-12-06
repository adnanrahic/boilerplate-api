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
let returnedUser = {};
function registerUser() {
  return request(app)
    .post('/api/auth/register')
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
    });

  });
});