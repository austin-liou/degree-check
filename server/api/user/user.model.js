'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ScheduleSchema = require('mongoose').model('Schedule').schema;
var SemesterSchema = require('mongoose').model('Semester').schema;

var UserSchema = new Schema({
  uid: String,
  name: String,
  email: String,
  schedules: [ScheduleSchema],
  prev_coursework: [SemesterSchema]
});

module.exports = mongoose.model('User', UserSchema);