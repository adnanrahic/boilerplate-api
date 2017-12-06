const expect = require('chai').expect;
const app = mutil.getApp();
const AuthController = require(__root + 'auth/AuthController');

describe('AuthController', function () {
  it('should be a function', function () {
    expect(AuthController).to.be.a('function');
  });
  it('should take one parameter', function () {
    expect(AuthController.bind(this, app)).to.not.throw(Error);
  });
  it('should throw error if app parameter is missing', function () {
    expect(AuthController).to.throw(Error);
  });
  it('should return an express router function', function () {
    expect(AuthController(app)).to.be.a('function');
  });
});  