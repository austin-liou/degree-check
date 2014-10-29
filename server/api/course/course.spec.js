'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require('assert');

describe('Functional Tests for /api/courses', function() {
  var courseid;
  it('should GET all existing courses', function(done) {
    request(app)
      .get('/api/courses')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
  it('should POST new course', function(done) {
    request(app)
      .post('/api/courses')
      .type('json')
      .send({name: "Course A"})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        assert.equal(res.body.name, "Course A");
        courseid = res.body._id;
        done();
      });
  });
  it('should PUT new name to course', function(done) {
    request(app)
      .put('/api/courses/' + courseid)
      .type('json')
      .send({name: "Course B"})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should GET course by id', function(done) {
    request(app)
      .get('/api/courses/' + courseid)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        assert.equal(res.body.name, "Course B");
        done();
      });
  });
  it('should DELETE course from database', function(done) {
    request(app)
      .delete('/api/courses/' + courseid)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should not be able to GET deleted course by id', function(done) {
    request(app)
      .get('/api/courses/' + courseid)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('Unit Tests for course controller', function() {
  it('should handleError by sending statusCode: 500', function(done) {
    request(app)
      .get('/api/courses/fake_id')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});