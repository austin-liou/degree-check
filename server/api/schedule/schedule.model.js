'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var MajorSchema = require('mongoose').model('Major').schema;
var SemesterSchema = require('mongoose').model('Semester').schema;

var ScheduleSchema = new Schema({
  name: String,
  major: [MajorSchema],
  semesters: [SemesterSchema]
});

module.exports = mongoose.model('Schedule', ScheduleSchema);