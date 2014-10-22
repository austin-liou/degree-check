'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var CourseSchema = require('mongoose').model('Course').schema;

var SemesterSchema = new Schema({
  season: String,
  year: Number,
  courses: [CourseSchema]
});

module.exports = mongoose.model('Semester', SemesterSchema);