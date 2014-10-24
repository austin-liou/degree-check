'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require('assert');

describe('Functional Tests for /api/requirements', function() {
  var requirementid;
  it('should GET all existing requirements', function(done) {
    request(app)
      .get('/api/requirements')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
  it('should POST new requirement', function(done) {
    request(app)
      .post('/api/requirements')
      .type('json')
      .send({name: "Requirement A", type: "Upper Division"})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        res.body.type.should.be.instanceof(String);
        assert.equal(res.body.name, "Requirement A");
        assert.equal(res.body.type, "Upper Division");
        requirementid = res.body._id;
        done();
      });
  });
  it('should PUT new Courses to requirement', function(done) {
    request(app)
      .put('/api/requirements/' + requirementid)
      .type('json')
      .send({courses: [{name: "Course A"}, {name: "Course B"}, {name: "Course C"}, {name: "Course D"}, {name: "Course E"}]})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should GET requirement by id', function(done) {
    request(app)
      .get('/api/requirements/' + requirementid)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        res.body.type.should.be.instanceof(String);
        res.body.courses.should.be.instanceof(Array);
        assert.equal(res.body.name, "Requirement A");
        assert.equal(res.body.type, "Upper Division");
        assert.equal(res.body.courses.length, 5);
        done();
      });
  });
  it('should DELETE requirement from database', function(done) {
    request(app)
      .delete('/api/requirements/' + requirementid)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should not be able to GET deleted requirement by id', function(done) {
    request(app)
      .get('/api/requirements/' + requirementid)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('Unit Tests for requirements controller', function() {
  it('should handleError by sending statusCode: 500', function(done) {
    request(app)
      .get('/api/requirements/fake_id')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});