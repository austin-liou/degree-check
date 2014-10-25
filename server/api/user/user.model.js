'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Schedule = require('../schedule/schedule.model'),
    Course = require('../course/course.model');

var UserSchema = new Schema({
  name: String,
  email: String,
  schedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
  prev_coursework: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('User', UserSchema);