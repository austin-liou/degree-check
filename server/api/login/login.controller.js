'use strict';

var _ = require('lodash');
var request = require('request');
var parseString = require('xml2js').parseString;
var User = require('../user/user.model');

// CalNet Auth Logic
exports.index = function(req, res) {
  if (req.session && req.session.user) { // check if session cookie is set
    if (req.sessionOptions && Date.now() > req.sessionOptions.expires) { // check for session cookie expiration
      req.session = null; // clears the session cookie
      // CAS login (CAS TGC might still be active, so user may not have to log in)
      res.redirect('https://auth.berkeley.edu/cas/login?service=https://degree-checker.herokuapp.com/login');
    }
    else { // found user in session
      res.redirect('../scheduler');
    }
  }
  else {
    var url = req.url;
    var ticketPos = url.indexOf('ticket'); // looking for CAS ticket
    if (ticketPos == -1) { // if no ticket, redirect to CAS
      res.redirect('https://auth.berkeley.edu/cas/login?service=https://degree-checker.herokuapp.com/login');
    }
    else {
      var ticket = url.substring(ticketPos + 7); // get ticket
      // request to CAS validation to get back UID
      request('https://auth.berkeley.edu/cas/serviceValidate?service=https://degree-checker.herokuapp.com/login&ticket=' + ticket, function (error, response, body) {
        parseString(response.body, function (err, result) { // parse XML
          if (result['cas:serviceResponse']['cas:authenticationSuccess']) {
            var uid = result['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];
            User.find({ uid: uid }, function (err, users) { // find user with UID
              if (err) {
                console.log(err);
              }
              if (!users) { // no user found. make one
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
                    User.create({ uid: uid, name: name, email: email }, function (err, user) { // create user
                      if (err) {
                        console.log(err);
                      }
                      req.session.user = user; // set session user
                      res.redirect('../scheduler');
                    });
                  });
                });
              }
              else { // user found
                req.session.user = users[0]; // set session user
                res.redirect('../scheduler');
              }
            });
          }
          else { // CAS validation failed. redirect to 500 page? or show failed auth, etc.
            res.redirect('../'); // TODO make a 500 error page
          }
        });
      });
    }
  }
};

function handleError(res, err) {
  return res.send(500, err);
}
