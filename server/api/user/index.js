'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:uid', controller.show);
router.post('/', controller.create);
router.put('/:uid', controller.update);
router.patch('/:uid', controller.update);
router.delete('/:uid', controller.destroy);

module.exports = router;