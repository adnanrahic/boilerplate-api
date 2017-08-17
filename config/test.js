const secret = process.env.secret || 'supersecret';
const env = process.env.node_env || 'test';
const db = process.env.db || 'mongodb://localhost:27017/boilerplate-api-test';

module.exports = {
  'secret': secret,
  'env': env,
  'db': db
};