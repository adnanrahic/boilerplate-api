const expect = require('chai').expect;
const request = require('chai').request;

/**
 * Set up server and constants
 */
const app = mutil.getApp();
const Note = mutil.getModel('Note');
const parseJSON = mutil.parseJSON;

let token;
const testUser = {
  name: 'somerandomuser',
  email: 'somerandomuser@example.com',
  password: 'supersecret'
};
function registerUser() {
  return request(app)
    .post('/api/auth/register')
    .send(testUser)
    // .then(res => token = res.body.token);
    .then(res => {
      token = res.body.token;
    });
}

let testNote = {
  title: 'Buy bread',
  description: 'This task is very important'
};

describe('NoteController', function () {

  before(function () {  
    return new Promise((resolve, reject) => {
      mutil.clearDB(function(err){
        if(err)
            return reject(err);

        resolve();
      })
    })
    .then(registerUser);
  });    
  after(function (done) {
      mutil.clearDB(function () {
          done();
      });
  });

  describe('NoteProvider', function () {
    
    describe('.createNote', function () {
      it('should add new note to the Notes collection', function () {
        this.slow(100);
  
        return request(app)
          .post('/api/notes')
          .set('x-access-token', token)
          .send(testNote)
          .then(res => {
            testNote = res.body;
            
            expect(res).to.have.status(200);
            expect(testNote).to.not.be.null.and.not.to.be.undefined;
            expect(testNote).to.have.property('_id');

            const note = Note.findById(testNote._id);
            return note.then(note => expect(parseJSON(note)).to.eql(parseJSON(testNote)));

          });
      });
    });

    describe('.getNotes', function () {
      it('should get all notes from the Notes collection', function () {
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
      });
    });
    
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
      });
    });
    
  });
});