module.exports = function (env) {
  const test = require('./config/test');
  const dev = require('./config/dev');

  switch (env) {
  case 'test':
    return test;
  case 'dev':
    return dev;
    
  default:
    return dev;
  }
};