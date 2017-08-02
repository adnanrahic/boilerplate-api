const server = require('./server');
server.serve()
  .then(app => console.log('Server running on port', app.port))
  .catch(err => console.error('Error in app.js at:', err));