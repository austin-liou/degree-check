/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  function apiLoggedIn (req, res, next) {
    if (req.session && req.session.uid) {
      next();
    }
    else {
      res.sendfile(app.get('appPath') + '/index.html');
    }
  }

  function adminLoggedIn (req, res, next) {
    var whitelist = app.get('admin-whitelist');
    for (var i = 0; i < whitelist.length; i++) {
      if (whitelist[i] === req.session.uid) {
        next();
      }
    }
    res.sendfile(app.get('appPath') + '/index.html');
  }

  // Insert routes below
  app.use('/authentication', require('./api/authentication'));
  app.all('/api*', apiLoggedIn, function (req, res, next) {
    next();
  });
  app.all('/api/users', adminLoggedIn, function (req, res, next) {
    next();
  });
  app.use('/api/users', require('./api/user'));
  app.use('/api/schedules', require('./api/schedule'));
  app.use('/api/semesters', require('./api/semester'));
  app.use('/api/courses', require('./api/course'));
  app.use('/api/majors', require('./api/major'));
  app.use('/api/requirements', require('./api/requirement'));

  app.use('/admin', function (req, res) {
    if (!(req.session && req.session.uid)) {
      res.redirect('../authentication/login');
    }
    else {
      var whitelist = app.get('admin-whitelist');
      for (var i = 0; i < whitelist.length; i++) {
        if (whitelist[i] ===  req.session.uid) {
          res.sendfile(app.get('appPath') + '/index.html');
        }
      }
      res.redirect('../scheduler');
    }
  });

  app.use('/scheduler', function e(req, res) {
    if (!(req.session && req.session.uid)) {
      res.redirect('../authentication/login');
    }
    else {
      res.sendfile(app.get('appPath') + '/index.html');
    }
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
