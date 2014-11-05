'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Course = require('../course/course.model');

var SemesterSchema = new Schema({
  season: String,
  year: String,
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Semester', SemesterSchema);