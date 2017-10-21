const server = require('./server');
server.serve(process.env.NODE_ENV || 'dev')
  .then(app => console.log('Server running on port', app.port))
  .catch(err => console.error('Error in app.js at:', err));