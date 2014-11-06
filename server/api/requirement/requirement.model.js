'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Course = require('../course/course.model');

var RequirementSchema = new Schema({
  name: String,
  type: String, // unit requirement or course requirement
  quantity: Number,
  division: String, // upper division or lower division
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Requirement', RequirementSchema);