'use strict';

var _ = require('lodash');
var Major = require('./major.model');

// Get list of majors
exports.index = function(req, res) {
  Major.find(function (err, majors) {
    if(err) { return handleError(res, err); }
    return res.json(200, majors);
  });
};

// Get a single major
exports.show = function(req, res) {
  Major.findById(req.params.id, function (err, major) {
    if(err) { return handleError(res, err); }
    if(!major) { return res.send(404); }
    return res.json(major);
  });
};

// Creates a new major in the DB.
exports.create = function(req, res) {
  Major.create(req.body, function(err, major) {
    if(err) { return handleError(res, err); }
    return res.json(201, major);
  });
};

// Updates an existing major in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Major.findById(req.params.id, function (err, major) {
    if (err) { return handleError(res, err); }
    if(!major) { return res.send(404); }
    var updated = _.merge(major, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, major);
    });
  });
};

// Deletes a major from the DB.
exports.destroy = function(req, res) {
  Major.findById(req.params.id, function (err, major) {
    if(err) { return handleError(res, err); }
    if(!major) { return res.send(404); }
    major.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}