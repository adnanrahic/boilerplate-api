const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, splat } = format;
global.__root = __dirname + '/';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

global.logger = createLogger({
  format: combine(
    timestamp(),
    printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    splat()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })]
});

module.exports = {
  serve(env) {
    app.config = require('./config')(env);
    require('./db')(app);
    require('./routes')(app);
    app.port = process.env.PORT || 3000;
    return new Promise((resolve, reject) => {
      app.listen(app.port, function (err) {
        if (err) 
          return reject(err);
        
        resolve(app);
      });
    });
  }
};