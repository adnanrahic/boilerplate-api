module.exports = function (env) {
  const test = require('./config/test');
  const dev = require('./config/dev');

  switch (env) {
    case 'test':
      return test;
      break;
    case 'dev':
      return dev;
      break;
  
    default:
      return dev;
      break;
  }
}