module.exports = function (env) {
  const test = require('./config/test');
  const dev = require('./config/dev');
  const prod = require('./config/prod');

  switch (env) {
  case 'test':
    return test;
  case 'dev':
    return dev;
  case 'prod':
    return prod;
    
  default:
    return dev;
  }
};