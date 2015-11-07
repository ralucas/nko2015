'use strict';

var express = require('express');
var router = express.Router();

var api = {
  handlers: require('./handlers'),
  managers: require('./managers'),
  services: require('./services')
};

router.get('/location', api.handlers.locationHandler.get);

module.exports = router;
