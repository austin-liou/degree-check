'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var RequirementSchema = require('mongoose').model('Requirement').schema;

var MajorSchema = new Schema({
  name: String,
  requirements: [RequirementSchema]
});

module.exports = mongoose.model('Major', MajorSchema);