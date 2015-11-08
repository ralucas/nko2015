'use strict';

var express = require('express');
var router = express.Router();

var api = {
  handlers: require('./handlers'),
  managers: require('./managers'),
  services: require('./services')
};

router.get('/', function(req, res) {
  res.send('Api is up');
});

router.get('/location', api.handlers.locationHandler.get);

module.exports = router;
