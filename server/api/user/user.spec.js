'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require('assert');

describe('Functional Tests for /api/users', function() {
  var userUid;

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
      .send({uid: "953545", name: "Michael Lannin", email: "mlannin23@berkeley.edu"})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        res.body.email.should.be.instanceof(String);
        res.body.schedules.should.be.instanceof(Array);
        res.body.prev_coursework.should.be.instanceof(Array);
        assert.equal(res.body.name, "Michael Lannin");
        assert.equal(res.body.email, "mlannin23@berkeley.edu");
        userUid = res.body.uid;
        done();
      });
  });
  it('should PUT new Schedules to user', function(done) {
    request(app)
      .put('/api/users/' + userUid)
      .type('json')
      .send({schedules: []})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should PUT new Semester to user\'s prev_coursework', function(done) {
    request(app)
      .put('/api/users/' + userUid)
      .type('json')
      .send({prev_coursework: []})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should GET user by id', function(done) {
    request(app)
      .get('/api/users/' + userUid)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        res.body.email.should.be.instanceof(String);
        res.body.schedules.should.be.instanceof(Array);
        res.body.prev_coursework.should.be.instanceof(Array);
        assert.equal(res.body.name, "Michael Lannin");
        assert.equal(res.body.email, "mlannin23@berkeley.edu");
        assert.equal(res.body.schedules.length, 0);
        done();
      });
  });

  it('should DELETE user from database', function(done) {
    request(app)
      .delete('/api/users/' + userUid)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should not be able to GET deleted user by id', function(done) {
    request(app)
      .get('/api/users/' + userUid)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
