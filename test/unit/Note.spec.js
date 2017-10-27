const expect = require('chai').expect;
const app = mutil.getApp();
const NoteController = require(__root + 'note/NoteController');

describe('NoteController', function () {
  it('should be a function', function () {
    expect(NoteController).to.be.a('function');
  });
  it('should take one parameter', function () {
    expect(NoteController.bind(this, app)).to.not.throw(Error);
  });
  it('should throw error if app parameter is missing', function () {
    expect(NoteController).to.throw(Error);
  });
  it('should return an express router function', function () {
    expect(NoteController(app)).to.be.a('function');
  });
});  