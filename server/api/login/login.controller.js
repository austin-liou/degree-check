'use strict';

var _ = require('lodash');;
var request = require('request');
var parseString = require('xml2js').parseString;
var util = require('util');
var User = require('../user/user.model');

// CalNet Auth Logic
exports.index = function(req, res) {
    if (req.session) {
        if (Date.now() > req.session.expires) {
            delete req.session;
            res.redirect('https://auth.berkeley.edu/cas/login?service=https://degree-checker.herokuapp.com/login');
        }
        else {
            User.find({uid: req.session.uid}, function (err, users) {
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
        console.log(url);
        if (ticketPos == -1) {
            res.redirect('https://auth.berkeley.edu/cas/login?service=https://degree-checker.herokuapp.com/login');
        }
        else {
            var ticket = url.substring(ticketPos + 7);
            request('https://auth.berkeley.edu/cas/serviceValidate?service=https://degree-checker.herokuapp.com/login&ticket=' + ticket, function (error, response, body) {
                parseString(response.body, function (err, result) {
                    if (result['cas:serviceResponse']['cas:authenticationSuccess']) {
                        var uid = result['cas:serviceResponse']['cas:authenticationSuccess']['cas:user'];
                        User.find({uid: uid}, function (err, users) {
                            if (err) {
                                console.log(err);
                            }
                            if (!users.length) {
                                User.create({ uid: uid}, function (err, user) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    req.session.user = user;
                                });
                            }
                            else {
                                req.session.user = users[0];
                            }
                            req.session.uid = uid;
                            res.redirect('../scheduler');
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