'use strict';

var request = require('request');
var parseString = require('xml2js').parseString;
var User = require('../user/user.model');
var Major = require('../major/major.model');

// Login
exports.login = function(req, res) {

  /*
    CalNet Auth Logic
    Note that we only set session UID because we're using cookie based sessions instead of session stores.
    Cookie based sessions shouldn't get too big, so we can make a call to the API for the rest of the information.
    Perhaps in the future if this scales up, we can work with session stores and store the entire user in the cookies.
  */

  if (req.session && req.session.uid) { // check if session cookie is set
    if (process.env.NODE_ENV == 'production') { // only enforce authentication in production
      if (req.sessionOptions && Date.now() > req.sessionOptions.expires) { // check for session cookie expiration
        req.session = null; // clears the session cookie
        // CAS login (CAS TGC might still be active, so user may not have to log in)
        res.redirect('https://auth.berkeley.edu/cas/login?service=https://degree-checker.herokuapp.com/authentication/login');
      }
      else { // found user in session
        res.redirect('../../admin');
      }
    } else {
      res.redirect('../../admin');
    }
  }
  else {
    if (process.env.NODE_ENV == 'production') { // only authenticate in production
      var url = req.url;
      var ticketPos = url.indexOf('ticket'); // looking for CAS ticket
      if (ticketPos == -1) { // if no ticket, redirect to CAS
        res.redirect('https://auth.berkeley.edu/cas/login?service=https://degree-checker.herokuapp.com/authentication/login');
      }
      else {
        var ticket = url.substring(ticketPos + 7); // get ticket
        // request to CAS validation to get back UID
        request('https://auth.berkeley.edu/cas/serviceValidate?service=https://degree-checker.herokuapp.com/authentication/login&ticket=' + ticket, function (error, response, body) {
          parseString(response.body, function (err, result) { // parse XML
            if (result['cas:serviceResponse']['cas:authenticationSuccess']) {
              var uid = result['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];
              User.findOne({ uid: uid }, function (err, user) { // find user with UID
                if (err) {
                  console.log(err);
                }
                if (!user) { // no user found. make one
                  var options = { // options for Berkeley API call
                    url: 'https://apis.berkeley.edu/calnet/person?searchFilter=uid%3D' + uid + '&attributesToReturn=displayname%2Cmail',
                    headers: {
                      app_id: 'cd96bb2a',
                      app_key: '871888e890cbdf5308c1f8570d2b6427'
                    }
                  };
                  // request to Berkeley API to get name and email of user
                  request(options, function(error, response, body){
                    parseString(response.body, function (err, result) { // parse XML
                      var name = result['CalNetLDAPQuery-Results']['person'][0]['displayname'][0];
                      var email = result['CalNetLDAPQuery-Results']['person'][0]['mail'][0];
                      Major.find({}, function(err, majors) {
                        var schedules = [{
                          'name': 'My First Schedule',
                          'major': majors[0],
                          'semesters': [
                            {
                              'season': 'Fall',
                              'year': 2014,
                              'courses': []
                            },
                            {
                              'season': 'Spring',
                              'year': 2015,
                              'courses': []
                            },
                            {
                              'season': 'Summer',
                              'year': 2015,
                              'courses': []
                            },
                            {
                              'season': 'Fall',
                              'year': 2015,
                              'courses': []
                            },
                            {
                              'season': 'Spring',
                              'year': 2016,
                              'courses': []
                            },
                            {
                              'season': 'Summer',
                              'year': 2016,
                              'courses': []
                            },
                            {
                              'season': 'Fall',
                              'year': 2016,
                              'courses': []
                            },
                            {
                              'season': 'Spring',
                              'year': 2017,
                              'courses': []
                            },
                            {
                              'season': 'Summer',
                              'year': 2017,
                              'courses': []
                            },
                            {
                              'season': 'Fall',
                              'year': 2017,
                              'courses': []
                            },
                            {
                              'season': 'Spring',
                              'year': 2018,
                              'courses': []
                            },
                            {
                              'season': 'Summer',
                              'year': 2018,
                              'courses': []
                            }
                          ]
                        }];
                        // create user
                        User.create({ uid: uid, name: name, email: email, schedules: schedules }, function (err, user) {
                          if (err) {
                            console.log(err);
                          }
                          req.session.uid = uid; // set session uid
                          res.redirect('../../admin');
                        });
                      });
                    });
                  });
                }
                else { // user found
                  req.session.uid = uid; // set session uid
                  res.redirect('../../admin');
                }
              });
            }
            else { // CAS validation failed. redirect to 500 page? or show failed auth, etc.
              res.redirect('../../'); // TODO make a 500 error page
            }
          });
        });
      }
    } else {
      var uid = '123456';

      req.session.uid = uid;
      return res.json(200, {uid: req.session.uid});
    }
  }
};

// Logout
exports.logout = function (req, res) {
  req.session = null; // Clear the session cookie
  res.redirect('https://auth.berkeley.edu/cas/logout?url=https://degree-checker.herokuapp.com'); // CAS logout
};

// Get list of UIDs
exports.uid = function (req, res) {
  return res.json(200, {uid: req.session.uid});
};

function handleError(res, err) {
  return res.send(500, err);
}
