'use strict';

var express = require('express');
var controller = require('./authentication.controller');

var router = express.Router();

router.get('/login', controller.login);
router.get('/logout', controller.logout);
router.get('/uid', controller.uid);
router.get('/testLogin', controller.testLogin);

module.exports = router;
