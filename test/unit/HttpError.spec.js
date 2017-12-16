const expect = require('chai').expect;
const HttpError = require(__root + 'helpers/HttpError');

describe('HttpError', function () {
  it('should be a function', function () {
    expect(HttpError).to.be.a('function');
  });
  it('should take two parameter', function () {
    expect(HttpError.bind(this, 200, 'message')).to.not.throw(Error);
  });
  it('should throw error if there are not exactly two parameters', function () {
    expect(HttpError.bind(this, 'message')).to.throw(Error);
  });
  it('should instantiate an Error object when called', function () {
    expect(new HttpError(404, 'Not found.')).to.be.an('object');
  });
});  