const expect = require('chai').expect;
const request = require('chai').request;

/*
 * Server setup
*/
const app = mutil.getApp();
const User = mutil.getModel('User');
const parseJSON = mutil.parseJSON;

let token;
let ID;
const testUser = {
  name: 'user56',
  email: 'user@provider.domain',
  password: 'secret78'
};

function registerUser() {
  return request(app)
    .post('/api/auth/register')
    .send(testUser)
    .then(res => {
      token = res.body.token;
    });
}

describe('UserController', function () {

  before(function () {

    return new Promise((resolve, reject) => {
      mutil.clearDB(function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    }).then(registerUser);
  });

  after(function (done) {

    mutil.clearDB(function () {
      done();
    });
  });

  describe('UserProvider', function () {

    describe('.createUser', function () {

      it('should add a new User to the user collection', function () {

        this.slow(100);

        return request(app)
          .post('/api/users')
          .set('x-access-token', token)
          .set('Content-Type', 'application/json')
          .send(testUser)
          .then((res) => {

            const user = res.body;
            ID = user._id;
            expect(res).to.have.status(200);
            expect(user).to.not.be.null.and.not.be.undefined;
            expect(user).to.have.property('_id');
          });
      });
    });

    describe('.getUsers', function () {

      it('should return users from the user collection', function () {

        this.slow(200);

        return request(app)
          .get('/api/users')
          .then((res) => {

            expect(res).to.have.status(200);
            expect(res.body).to.not.be.null.and.not.be.undefined;
          });
      });
    });

    describe('.getUser', function () {

      it('should return a particular user from the user collection', function () {

        this.slow(200);

        return request(app)
          .get('/api/users/' +ID)
          .then((res) => {

            expect(res).to.have.status(200);
            expect(res.body).to.not.be.null.and.not.be.undefined;
          });
      });
    });

    describe('.putUsers', function () {

      it('should update user info in the database', function () {

        this.slow(200);

        return request(app)
          .put('/api/users/' +ID)
          .set('x-access-token', token)
          .set('Content-Type', 'application/json')
          .send({ name: 'randomuser' })
          .then((res) => {

            expect(res).to.have.status(200);
            expect(res.body).to.not.be.null.and.not.be.undefined;
          });
      });
    });
    
    describe('.deleteUsers', function () {

      it('should delete a user from the user collection', function () {

        this.slow(200);

        return request(app)
          .delete('/api/users/' +ID)
          .set('x-access-token', token)
          .then((res) => {

            expect(res).to.have.status(200);
            expect(res.body).to.not.be.null.and.not.be.undefined;
          });
      });
    });
    
  });
});
