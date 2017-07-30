const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const async = require('async');

const mocha = new Mocha();

//// Add test files
const testDir = 'test';
var files = Mocha.utils.lookupFiles(testDir,['js'], true);
files.forEach(function(file) {
    mocha.addFile(file);
});

//// Global export of mutil 
global.mutil = {
    getServer: getServer,
    clearDB: clearDB,
    getModel: getModel,
}

//// Chai - Configure
const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-as-promised'));


//// Start test server and run mocha
let serverApp = null;
const startServer = require('./lib/server');
startServer('test')
.then(function(app){
    serverApp = app;

    mocha.ui('bdd').run()
})
.catch(function(err){
    console.error('Failed to start server', err);
});


///////////////////////////
//// MUTIL functions 
///////////////////////////
function getServer(){
    return serverApp;
}

function clearDB(done){
    let mongoose = require('mongoose');
    async.each(mongoose.models, function(model, next){
        // console.log('clear model', model.modelName);
        model.remove(next);
    }, done);
}


function getModel(model_name){
    try{
        return require('mongoose').model(model_name);
    }catch(err){
        return null;
    }
    
}