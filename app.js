var express = require('express');
var app = express();
var db = require('./db');
var routes = require('./routes')(app);
var server = require('./server');
server.serve(app);