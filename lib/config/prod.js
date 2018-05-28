const secret = process.env.SECRET || 'supersecret';
const env = process.env.NODE_ENV || 'production';
const db = process.env.DB || 'mongodb://localhost:27017/boilerplate-api';

module.exports = {
  'secret': secret,
  'env': env,
  'db': db
};