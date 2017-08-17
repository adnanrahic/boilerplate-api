const expect = require('chai').expect;
const request = require('chai').request;

/**
 * Set up server and constants
 */
const app = mutil.getApp();
const Note = mutil.getModel('Note');
const parseJSON = mutil.parseJSON;

let testNote = {
  title: 'Buy bread',
  description: 'This task is very important'
};

describe('NoteController', function () {

  before(function () {  
    return new Promise((resolve, reject) => {
      mutil.clearDB(function(err){
        if(err){
            return reject(err);
        }
        return resolve();
      })
    });
  });    
  after(function (done) {
      mutil.clearDB(function () {
          done();
      });
  });

  describe('.post()', function () {

    describe('NoteProvider', function () {
      
      describe('.createNote', function () {
        it('should add new note to the Notes collection', function () {
          this.slow(100);
    
          return request(app)
            .post('/api/notes')
            // .set('x-access-token', token)
            .send(testNote)
            .then(res => {
              testNote = res.body;
              
              expect(res).to.have.status(200);
              expect(testNote).to.not.be.null.and.not.to.be.undefined;
              expect(testNote).to.have.property('_id');

              const note = Note.findById(testNote._id).lean();
              return note
                .then(note => {
                  note._id = String(testNote._id);
                  return expect(note).to.eql(testNote);
                });

            })
            .catch(err => expect(err).to.be.null);
        });
      });

    });

  });

  describe('.get()', function () {
    
    describe('NoteProvider', function () {
      
      describe('.getNote', function () {
        it('should get a note from the Notes collection', function () {
          this.slow(200);
    
          return request(app)
            .get('/api/notes')
            // .set('x-access-token', token)
            .then(res => {
              let responseNotes = res.body;
              
              expect(res).to.have.status(200);
              expect(responseNotes).to.not.be.null.and.not.to.be.undefined;
              expect(responseNotes).to.have.lengthOf(1);

              const notes = Note.find({});
              return notes.then(notes => expect(parseJSON(notes)).to.eql(parseJSON(responseNotes)));

            })
            .catch(err => expect(err).to.be.null);
        });
      });

    });

  });

});