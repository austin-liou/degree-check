'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require('assert');

describe('Functional Tests for /api/semesters', function() {
  var semesterid;
  it('should GET all existing semesters', function(done) {
    request(app)
      .get('/api/semesters')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
  it('should POST new semester', function(done) {
    request(app)
      .post('/api/semesters')
      .type('json')
      .send({season: "Fall", year: 2018})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.season.should.be.instanceof(String);
        res.body.year.should.be.instanceof(Number);
        res.body.courses.should.be.instanceof(Array);
        assert.equal(res.body.season, "Fall");
        assert.equal(res.body.year, 2018)
        semesterid = res.body._id;
        done();
      });
  });
  it('should PUT new Courses to semester', function(done) {
    request(app)
      .put('/api/semesters/' + semesterid)
      .type('json')
      .send({courses: []})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should GET schedule by id', function(done) {
    request(app)
      .get('/api/semesters/' + semesterid)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.season.should.be.instanceof(String);
        res.body.year.should.be.instanceof(Number);
        res.body.courses.should.be.instanceof(Array);
        assert.equal(res.body.season, "Fall");
        assert.equal(res.body.year, 2018);
        assert.equal(res.body.courses.length, 0);
        done();
      });
  });
  it('should DELETE semseter from database', function(done) {
    request(app)
      .delete('/api/semesters/' + semesterid)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should not be able to GET deleted schedule by id', function(done) {
    request(app)
      .get('/api/semesters/' + semesterid)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('Unit Tests for semester controller', function() {
  it('should handleError by sending statusCode: 500', function(done) {
    request(app)
      .get('/api/semesters/fake_id')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});