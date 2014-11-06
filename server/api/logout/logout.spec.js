'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/logout', function() {

  it('should respond with plain text', function(done) {
    request(app)
      .get('/api/logout')
      .expect(302)
      .expect('Content-Type', "text/plain; charset=utf-8")
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});