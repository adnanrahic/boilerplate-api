const expect = require('chai').expect;
const app = mutil.getApp();
const UserController = require(__root + 'user/UserController');

describe('UserController', function () {
  it('should be a function', function () {
    expect(UserController).to.be.a('function');
  });
  it('should take on parameter', function () {
    expect(UserController.bind(this, app)).to.not.throw(Error);
  });
  it('should throw error if app parameter is missing', function () {
    expect(UserController).to.throw(Error);
  });
  it('should return an express router function', function () {
    expect(UserController(app)).to.be.a('function');
  });
});
