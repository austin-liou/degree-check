'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Schedule = require('../schedule/schedule.model'),
    Course = require('../course/course.model');

var UserSchema = new Schema({
  uid: String,
  name: String,
  email: String,
  schedules: [Schedule.schema],
  prev_coursework: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('User', UserSchema);
