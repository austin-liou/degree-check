'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var assert = require('assert');
var controller = require('./major.controller');

describe('Functional Tests for /api/majors', function() {
  var majorid;
  it('should GET all existing majors', function(done) {
    request(app)
      .get('/api/majors')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
  it('should POST new major', function(done) {
    request(app)
      .post('/api/majors')
      .type('json')
      .send({name: "Major A"})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        assert.equal(res.body.name, "Major A");
        majorid = res.body._id;
        done();
      });
  });
  it('should PUT new Requirements to major', function(done) {
    request(app)
      .put('/api/majors/' + majorid)
      .type('json')
      .send({requirements: [{name: "Requirement A"}, {name: "Requriement B"}, {name: "Requriement C"}, {name: "Requriement D"}]})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should GET major by id', function(done) {
    request(app)
      .get('/api/majors/' + majorid)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.name.should.be.instanceof(String);
        res.body.requirements.should.be.instanceof(Array);
        assert.equal(res.body.name, "Major A");
        assert.equal(res.body.requirements.length, 4);
        done();
      });
  });
  it('should DELETE major from database', function(done) {
    request(app)
      .delete('/api/majors/' + majorid)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should not be able to GET deleted major by id', function(done) {
    request(app)
      .get('/api/majors/' + majorid)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});