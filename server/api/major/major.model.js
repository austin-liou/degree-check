'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Requirement = require('../requirement/requirement.model');

var MajorSchema = new Schema({
  name: String,
  requirements: [Requirement]
});

module.exports = mongoose.model('Major', MajorSchema);