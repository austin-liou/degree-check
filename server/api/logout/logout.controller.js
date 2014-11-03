'use strict';

var _ = require('lodash');

// Logout
exports.index = function(req, res) {
  req.session = null;
  res.redirect('https://auth.berkeley.edu/cas/logout?url=https://degree-checker.herokuapp.com')
};


function handleError(res, err) {
  return res.send(500, err);
}
