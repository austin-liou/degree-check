'use strict';

var _ = require('lodash');
var Requirement = require('./requirement.model');

// Get list of requirements
exports.index = function(req, res) {
  Requirement.find(function (err, requirements) {
    if(err) { return handleError(res, err); }
    return res.json(200, requirements);
  });
};

// Get a single requirement
exports.show = function(req, res) {
  Requirement.findById(req.params.id, function (err, requirement) {
    if(err) { return handleError(res, err); }
    if(!requirement) { return res.send(404); }
    return res.json(requirement);
  });
};

// Creates a new requirement in the DB.
exports.create = function(req, res) {
  Requirement.create(req.body, function(err, requirement) {
    if(err) { return handleError(res, err); }
    return res.json(201, requirement);
  });
};

// Updates an existing requirement in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Requirement.findById(req.params.id, function (err, requirement) {
    if (err) { return handleError(res, err); }
    if(!requirement) { return res.send(404); }
    var updated = _.merge(requirement, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, requirement);
    });
  });
};

// Deletes a requirement from the DB.
exports.destroy = function(req, res) {
  Requirement.findById(req.params.id, function (err, requirement) {
    if(err) { return handleError(res, err); }
    if(!requirement) { return res.send(404); }
    requirement.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}