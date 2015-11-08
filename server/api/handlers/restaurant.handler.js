'use strict';
var managers = require('../managers');
var _ = require('lodash');

function RestaurantHandler() {}

RestaurantHandler.prototype.put = function put(req, res) {
  console.log('called:', req.body);
  // if (_.isEmpty(req.body)) {
  //   res.send(400).send('Parameters required. Bad request');
  // }
  managers.restaurantManager.save(req.body)
    .then(function(response) {
      res.status(200).send(response);
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send(error);
    });
};


module.exports = RestaurantHandler;
