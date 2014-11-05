'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Major = require('../major/major.model');

var AdminSchema = new Schema({
  name: String,
  uid: String,
  email: String,
  majors: [{type: Schema.Types.ObjectId, ref: 'Major'}]
});

module.exports = mongoose.model('Admin', AdminSchema);