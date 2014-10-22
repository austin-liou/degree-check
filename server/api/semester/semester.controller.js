'use strict';

var _ = require('lodash');
var Semester = require('./semester.model');

// Get list of semesters
exports.index = function(req, res) {
  Semester.find(function (err, semesters) {
    if(err) { return handleError(res, err); }
    return res.json(200, semesters);
  });
};

// Get a single semester
exports.show = function(req, res) {
  Semester.findById(req.params.id, function (err, semester) {
    if(err) { return handleError(res, err); }
    if(!semester) { return res.send(404); }
    return res.json(semester);
  });
};

// Creates a new semester in the DB.
exports.create = function(req, res) {
  Semester.create(req.body, function(err, semester) {
    if(err) { return handleError(res, err); }
    return res.json(201, semester);
  });
};

// Updates an existing semester in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Semester.findById(req.params.id, function (err, semester) {
    if (err) { return handleError(res, err); }
    if(!semester) { return res.send(404); }
    var updated = _.merge(semester, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, semester);
    });
  });
};

// Deletes a semester from the DB.
exports.destroy = function(req, res) {
  Semester.findById(req.params.id, function (err, semester) {
    if(err) { return handleError(res, err); }
    if(!semester) { return res.send(404); }
    semester.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}