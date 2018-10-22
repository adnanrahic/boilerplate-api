module.exports = (testDir) => {
  const Mocha = require('mocha');
  const async = require('async');
  const mocha = new Mocha();

  //// Add test files
  var files = Mocha.utils.lookupFiles(testDir, ['js'], true);
  files.forEach(function (file) {
    mocha.addFile(file);
  });

  global.__root = __dirname + '/';

  //// Global export of mutil
  global.mutil = {
    getApp: getApp,
    clearDB: clearDB,
    getModel: getModel,
    parseJSON: parseJSON
  };

  //// Chai - Configure
  const chai = require('chai');
  chai.use(require('chai-http'));
  chai.use(require('chai-as-promised'));


  //// run the server and get the app object
  const server = require('./lib/server');
  let appToReturn;
  server.serve('test')
    .then(function (app) {
      appToReturn = app;
      mocha.ui('bdd').run(code => {
        process.exit(code)
      }); // exit the node process on test end
    })
    .catch('Failed to start test server.');

  ///////////////////////////
  //// MUTIL functions 
  ///////////////////////////
  function getApp() {
    return appToReturn;
  }

  function clearDB(done) {
    let mongoose = require('mongoose');
    async.each(mongoose.models, function (model, next) {
      model.remove(next);
    }, done);
  }

  function getModel(model_name) {
    try {
      return require('mongoose').model(model_name);
    } catch (err) {
      return null;
    }

  }

  function parseJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}