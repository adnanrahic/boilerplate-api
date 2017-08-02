var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var db = require('./db');
var routes = require('./routes')(app);
app.port = process.env.PORT || 3000;

module.exports = {
  serve() {
    return new Promise((resolve, reject) => {
      app.listen(app.port, function (err) {
        if (err) 
          return reject(err);
        
        resolve(app);
      });
    });
  }
}