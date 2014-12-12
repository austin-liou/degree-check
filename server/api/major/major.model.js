'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequirementSchema = new Schema({
  name: String,
  type: String, // unit requirement or course requirement
  quantity: Number,
  division: String, // upper division or lower division
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  exclusives: [{type: Schema.Types.ObjectId, ref: 'Requirement'}]
});

var MajorSchema = new Schema({
  name: String,
  requirements: [RequirementSchema]
});

module.exports = mongoose.model('Requirement', RequirementSchema);
module.exports = mongoose.model('Major', MajorSchema);