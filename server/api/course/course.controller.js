'use strict';

var _ = require('lodash');
var Course = require('./course.model');
var cache = require('memory-cache');
var cachePrefix = 'course-';

// Get list of courses
exports.index = function(req, res) {
  var cached = cache.get('all-courses');
  if (cached) { return res.json(200, cached); }

  Course.find(function (err, courses) {
    if(err) { return handleError(res, err); }
    return res.json(200, courses);
  });
};

// Get a single course
exports.show = function(req, res) {
  var cached = cache.get(cachePrefix+req.params.id);
  if (cached) { return res.json(200, cached); }

  Course.findById(req.params.id, function (err, course) {
    if(err) { return handleError(res, err); }
    if(!course) { return res.send(404); }
    cache.put(cachePrefix+course._id, course, 10000);
    return res.json(course);
  });
};

// Creates a new course in the DB.
exports.create = function(req, res) {
  Course.create(req.body, function(err, course) {
    if(err) { return handleError(res, err); }
    cache.del('all-courses');
    cache.put(cachePrefix+course._id, course, 10000);
    return res.json(201, course);
  });
};

// Updates an existing course in the DB.
exports.update = function(req, res) {
  cache.del('all-majors');
  cache.del(cachePrefix+req.body._id);

  if(req.body._id) { delete req.body._id; }
  Course.findById(req.params.id, function (err, course) {
    if (err) { return handleError(res, err); }
    if(!course) { return res.send(404); }
    var updated = _.merge(course, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      cache.put(cachePrefix+course._id, course, 10000);
      return res.json(200, course);
    });
  });
};

// Deletes a course from the DB.
exports.destroy = function(req, res) {
  cache.del('all-courses');
  cache.del(cachePrefix+req.params.id);

  Course.findById(req.params.id, function (err, course) {
    if(err) { return handleError(res, err); }
    if(!course) { return res.send(404); }
    course.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}