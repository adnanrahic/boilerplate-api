'use strict';

module.exports = HttpError;
function HttpError(status, message) {
  if (arguments.length !== 2) throw new Error('HttpError must take two parameters.');
  
  Error.captureStackTrace(this);
  this.status = status;
  this.message = message;
}
HttpError.prototype = new Error;