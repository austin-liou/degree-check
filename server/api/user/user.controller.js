'use strict';

var _ = require('lodash');
var User = require('./user.model');

// Get list of users
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.json(200, users);
  });
};

// Get a single user
exports.show = function(req, res) {
  User.findOne({uid: req.params.id}).populate('prev_coursework').exec(function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var opts = [{path: 'schedules.major', model: 'Major'},
                {path: 'schedules.semesters.courses', model: 'Course'}];
    User.populate(user, opts, function (err, user) {
        var opts = [{path: 'schedules.major.requirements.courses', model: 'Course'}];
        User.populate(user, opts, function(err, user){
            return res.json(user);
        });
    });
  });
};

// Creates a new user in the DB.
exports.create = function(req, res) {
  User.create(req.body, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.json(201, user);
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findOne({uid: req.params.id}, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    // User is completely overridden with each call
    var updated = _.merge(user, req.body, function(a,b){
        return b;
    });
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findOne({uid: req.params.id}, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
