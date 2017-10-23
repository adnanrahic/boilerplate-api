const secret = process.env.SECRET || 'supersecret';
const env = process.env.NODE_ENV || 'test';
const db = process.env.DB || 'mongodb://localhost:27017/boilerplate-api-test';

module.exports = {
  'secret': secret,
  'env': env,
  'db': db
};