'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require('assert');

describe('Functional Tests for /api/users', function() {
  var userid;
  it('should GET all existing users', function(done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
  it('should POST new user', function(done) {
    request(app)
      .post('/api/users')
      .type('json')
      .send({name: "Student A", email: "StudentA@berkeley.edu"})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        res.body.email.should.be.instanceof(String);
        res.body.schedules.should.be.instanceof(Array);
        res.body.prev_coursework.should.be.instanceof(Array);
        assert.equal(res.body.name, "Student A");
        assert.equal(res.body.email, "StudentA@berkeley.edu");
        userid = res.body._id;
        done();
      });
  });
  it('should PUT new Schedules to user', function(done) {
    request(app)
      .put('/api/users/' + userid)
      .type('json')
      .send({schedules: [{name: "Schedule 1"}, {name: "Schedule 2"}, {name: "Schedule 3"}]})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should PUT new Semester to user\'s prev_coursework', function(done) {
    request(app)
      .put('/api/users/' + userid)
      .type('json')
      .send({prev_coursework: [{season: "Fall", year: 1000}]})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should GET user by id', function(done) {
    request(app)
      .get('/api/users/' + userid)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        res.body.email.should.be.instanceof(String);
        res.body.schedules.should.be.instanceof(Array);
        res.body.prev_coursework.should.be.instanceof(Array);
        assert.equal(res.body.name, "Student A");
        assert.equal(res.body.email, "StudentA@berkeley.edu");
        assert.equal(res.body.schedules.length, 3);
        assert.equal(res.body.prev_coursework[0].season, "Fall");
        assert.equal(res.body.prev_coursework[0].year, 1000);
        done();
      });
  });
  it('should DELETE user from database', function(done) {
    request(app)
      .delete('/api/users/' + userid)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should not be able to GET deleted user by id', function(done) {
    request(app)
      .get('/api/users/' + userid)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('Unit Tests for user controller', function() {
  it('should handleError by sending statusCode: 500', function(done) {
    request(app)
      .get('/api/users/fake_id')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});