var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var db = require('./db');
var routes = require('./routes')(app);
var server = require('./server');
server.serve(app);