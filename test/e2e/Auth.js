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

describe('AuthController', function () {

  before(function () {  
    return new Promise((resolve, reject) => {
      mutil.clearDB(function(err){
        if(err)
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
        this.slow(100);
  
        return registerUser()
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

    describe('.login', function () {
      it('should authenticate a user', function () {
        this.slow(100);
  
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
    
  });
});