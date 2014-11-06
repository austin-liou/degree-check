/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/logout', require('./api/logout'));
  app.use('/api/login', require('./api/login'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/schedules', require('./api/schedule'));
  app.use('/api/semesters', require('./api/semester'));
  app.use('/api/courses', require('./api/course'));
  app.use('/api/majors', require('./api/major'));
  app.use('/api/requirements', require('./api/requirement'));
  app.use('/api/things', require('./api/thing'));
  app.use('/login', require('./api/login'));
  app.use('/logout', require('./api/logout'));
  app.use('/scheduler', function (req, res) {
    if (!(req.session && req.session.uid)) {
      res.redirect('../login');
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
