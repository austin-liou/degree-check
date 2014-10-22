'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var CourseSchema = require('mongoose').model('Course').schema;

var RequirementSchema = new Schema({
  name: String,
  type: String,
  courses: [CourseSchema]
});

module.exports = mongoose.model('Requirement', RequirementSchema);