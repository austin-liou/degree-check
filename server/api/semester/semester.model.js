'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SemesterSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Semester', SemesterSchema);