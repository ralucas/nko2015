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

router.put('/restaurant', api.handlers.restaurantHandler.put);

router.get('/restaurant/waitlist', api.handlers.restaurantHandler.getWaitlist);

module.exports = router;
