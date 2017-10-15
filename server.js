const express = require('express');
const app = express();
const bodyParser = require('body-parser');
global.__root = __dirname + '/';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  serve(env) {
    app.config = require('./config')(env);
    const db = require('./db')(app);
    const routes = require('./routes')(app);
    app.port = process.env.PORT || 3000;
    return new Promise((resolve, reject) => {
      app.listen(app.port, function (err) {
        if (err) 
          return reject(err);
        
        resolve(app);
      });
    });
  }
}