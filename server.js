module.exports = {
  serve(env) {
    return new Promise((resolve, reject) => {
      
      const express = require('express');
      const app = express();
      const bodyParser = require('body-parser');
      global.__root = __dirname + '/';
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.config = require('./config')(env);
      const db = require('./db')(app);
      const routes = require('./routes')(app);
      app.port = process.env.PORT || 3000;

      app.listen(app.port, function (err) {
        if (err) 
          return reject(err);
        
        resolve(app);
      });
    });
  }
}