'use strict';
var managers = require('../managers');
var helpers = require('../helpers');
var _ = require('lodash');
console.log('helpers', helpers);
function LocationHandler() {}

LocationHandler.prototype.get = function get(req, res) {
  var restaurant;

  console.log('called:', req.query);
  if (_.isEmpty(req.query)) {
    res.send(400).send('Bad request');
  }

  managers.locationManager.getLocation(req.query)
    .then(function(response) {
      restaurant = response.businesses[0];
      return helpers.getWaitTime(restaurant);
    })
    .then(function(waitTime) {
      res.status(200).json({waitTime: waitTime, restaurant: restaurant});
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send(error);
    });
};

module.exports = LocationHandler;

