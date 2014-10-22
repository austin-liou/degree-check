/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var fs = require('fs');
var models = ['course', 'semester', 'requirement', 'major', 'schedule', 'user'];
models.forEach(function (entry){
    var model_path = __dirname + '/api/' + entry;
    fs.readdirSync(model_path).forEach(function (file){
        if (~file.indexOf('.spec.js')){}
        else if (~file.indexOf('.js')){
            require(model_path + '/' + file);
        }
    });
});

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;