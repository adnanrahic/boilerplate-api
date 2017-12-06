const secret = process.env.SECRET || 'supersecret';
const env = process.env.NODE_ENV || 'dev';
const db = process.env.DB || 'mongodb://localhost:27017/boilerplate-api';

module.exports = {
  'secret': secret,
  'env': env,
  'db': db
};