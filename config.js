const secret = process.env.secret || 'supersecret';
const env = process.env.node_env || 'dev';

module.exports = {
  'secret': secret,
  'env': env
};