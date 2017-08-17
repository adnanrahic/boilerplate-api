const secret = process.env.secret || 'supersecret';
const env = process.env.node_env || 'dev';
const db = process.env.db || 'mongodb://localhost:27017/boilerplate-api';

module.exports = {
  'secret': secret,
  'env': env,
  'db': db
};