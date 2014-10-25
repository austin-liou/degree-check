'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Course = require('../course/course.model');

var RequirementSchema = new Schema({
  name: String,
  type: String,
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Requirement', RequirementSchema);