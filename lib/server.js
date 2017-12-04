const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const winston = require('winston');
const { combine, timestamp, printf, splat } = winston.format;
global.__root = __dirname + '/';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!fs.existsSync('logs')) fs.mkdirSync('logs');

global.logger = winston.createLogger({
  format: combine(
    timestamp(),
    printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    splat()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })]
});

module.exports = {
  serve(env) {

    if (env !== 'test') 
      logger.add(new winston.transports.Console, { prettyPrint: true });

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