'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MajorSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Major', MajorSchema);