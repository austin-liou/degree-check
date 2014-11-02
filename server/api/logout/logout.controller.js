'use strict';

var _ = require('lodash');
var Logout = require('./logout.model');

// Get list of logouts
exports.index = function(req, res) {
  req.session = null;
  res.redirect('../');
};


function handleError(res, err) {
  return res.send(500, err);
}
