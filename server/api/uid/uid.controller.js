'use strict';

var _ = require('lodash');

// Get list of uids
exports.index = function(req, res) {
  return res.json(200, {uid: req.session.uid});
};
