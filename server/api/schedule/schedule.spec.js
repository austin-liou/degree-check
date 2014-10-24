'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require('assert');

describe('Functional Tests for /api/schedules', function() {
  var scheduleid;
  it('should GET all existing schedules', function(done) {
    request(app)
      .get('/api/schedules')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
  it('should POST new schedule', function(done) {
    request(app)
      .post('/api/schedules')
      .type('json')
      .send({name: "Schedule A"})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        res.body.major.should.be.instanceof(Array);
        res.body.semesters.should.be.instanceof(Array);
        assert.equal(res.body.name, "Schedule A");
        scheduleid = res.body._id;
        done();
      });
  });
  it('should PUT new Majors to schedule', function(done) {
    request(app)
      .put('/api/schedules/' + scheduleid)
      .type('json')
      .send({major: [{name: "Major A"}, {name: "Major B"}]})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should PUT new Semesters to schedule', function(done) {
    request(app)
      .put('/api/schedules/' + scheduleid)
      .type('json')
      .send({semesters: [{season: "Fall", year: 2018}, {name: "Spring", year: 2019}, {name: "Summer", year: 2019}]})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should GET schedule by id', function(done) {
    request(app)
      .get('/api/schedules/' + scheduleid)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        res.body.major.should.be.instanceof(Array);
        res.body.semesters.should.be.instanceof(Array);
        assert.equal(res.body.name, "Schedule A");
        assert.equal(res.body.major.length, 2);
        assert.equal(res.body.semesters.length, 3);
        done();
      });
  });
  it('should DELETE schedule from database', function(done) {
    request(app)
      .delete('/api/schedules/' + scheduleid)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should not be able to GET deleted schedule by id', function(done) {
    request(app)
      .get('/api/schedules/' + scheduleid)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('Unit Tests for schedule controller', function() {
  it('should handleError by sending statusCode: 500', function(done) {
    request(app)
      .get('/api/schedules/fake_id')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});