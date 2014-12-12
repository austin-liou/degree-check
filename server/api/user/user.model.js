'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Major = require('../major/major.model'),
    Course = require('../course/course.model');

var SemesterSchema = new Schema({
  season: String,
  year: String,
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

var ScheduleSchema = new Schema({
  name: String,
  comments: { type: String, default: '' },
  blessed: { type: Boolean, default: false },
  major: [{ type: Schema.Types.ObjectId, ref: 'Major' }],
  semesters: [SemesterSchema]
});

var UserSchema = new Schema({
  uid: String,
  name: String,
  email: String,
  schedules: [ScheduleSchema],
  prev_coursework: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Semester', SemesterSchema);
module.exports = mongoose.model('Schedule', ScheduleSchema);
module.exports = mongoose.model('User', UserSchema);
