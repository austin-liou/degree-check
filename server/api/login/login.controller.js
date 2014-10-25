'use strict';

var _ = require('lodash');
var http = require('request');
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
                    return handleError(res, err);
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
            var ticket = url.substring(ticketPos);
            request('https://auth.berkeley.edu/cas/serviceValidate?service=https://degree-checker.herokuapp.com/login&ticket=' + ticket, function (error, response, body) {
                if (error || response.statusCode != 200) {
                    return handleError(res, error);
                }
                else {
                    var xmlDoc = response.responseXML;
                    var uid = xmlDoc.getElementsByTagName("cas:user");
                    User.create({ uid: uid}, function (err, user) {
                        if (err) throw err;
                        res.redirect('../scheduler');
                    });
                }
            })
        }
    }
};

function handleError(res, err) {
  return res.send(500, err);
}