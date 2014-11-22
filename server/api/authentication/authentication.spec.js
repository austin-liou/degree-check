'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('Functional Tests for /api/authentication', function() {

  it('should respond with plain text', function(done) {
    request(app)
      .get('/api/authentication/logout')
      .expect(302)
      .expect('Content-Type', "text/plain; charset=utf-8")
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should respond with JSON object', function(done) {
    request(app)
      .get('/api/authentication/uid')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});
