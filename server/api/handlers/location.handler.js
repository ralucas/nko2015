'use strict';
var managers = require('../managers');
var _ = require('lodash');

function LocationHandler() {}

LocationHandler.prototype.get = function get(req, res) {
  console.log('called:', req.query);
  if (_.isEmpty(req.query)) {
    res.send(400).send('Bad request');
  }
  managers.locationManager.getLocation(req.query)
    .then(function(response) {
      res.status(200).send(response);
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send(error);
    });
};

module.exports = LocationHandler;

