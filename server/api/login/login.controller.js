'use strict';

var _ = require('lodash');
var request = require('request');
var parseString = require('xml2js').parseString;
var User = require('../user/user.model');

// CalNet Auth Logic
exports.index = function(req, res) {
  if (req.session && req.session.uid) {
    if (req.sessionOptions && Date.now() > req.sessionOptions.expires) {
      req.session = null;
      res.redirect('https://auth.berkeley.edu/cas/login?service=https://degree-checker.herokuapp.com/login')
    }
    else {
      User.find({uid: req.session._id}, function (err, users) {
        if (err) {
          console.log(err);
        }
        res.redirect('../scheduler');
      });
    }
  }
  else {
    var url = req.url;
    var ticketPos = url.indexOf('ticket');
    if (ticketPos == -1) {
      res.redirect('https://auth.berkeley.edu/cas/login?service=https://degree-checker.herokuapp.com/login');
    }
    else {
      var ticket = url.substring(ticketPos + 7);
      request('https://auth.berkeley.edu/cas/serviceValidate?service=https://degree-checker.herokuapp.com/login&ticket=' + ticket, function (error, response, body) {
        parseString(response.body, function (err, result) {
          if (result['cas:serviceResponse']['cas:authenticationSuccess']) {
            var uid = result['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];
            User.find({ uid: uid }, function (err, users) {
              if (err) {
                console.log(err);
              }
              if (!users) {
                var options = {
                  url: 'https://apis.berkeley.edu/calnet/person?searchFilter=uid%3D' + uid + '&attributesToReturn=displayname%2Cmail',
                  headers: {
                    app_id: 'cd96bb2a',
                    app_key: '871888e890cbdf5308c1f8570d2b6427'
                  }
                };
                request(options, function(error, response, body){
                  parseString(response.body, function (err, result) {
                    var name = result['CalNetLDAPQuery-Results']['person'][0]['displayname'][0];
                    var email = result['CalNetLDAPQuery-Results']['person'][0]['mail'][0];
                    User.create({ uid: uid, name: name, email: email }, function (err, user) {
                      if (err) {
                        console.log(err);
                      }
                      req.session.user = user;
                      req.session.uid = uid;
                      res.redirect('../scheduler');
                    });
                  });
                });
              }
              else {
                req.session.user = users[0];
                req.session.uid = uid;
                res.redirect('../scheduler');
              }
            });
          }
          else {
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
