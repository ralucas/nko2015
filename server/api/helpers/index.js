var services = require('../services');
var _ = require('lodash');
var moment = require('moment');

//Constants
var AVG_WAIT_TIME = 25;

function Helpers() {}

Helpers.prototype.getWaitTime = function(restaurant) {
  var _this = this;
  return services.mongoService.findById(restaurant.id, 'Reservation')
    .then(function(data) {
      return _this.determineWaitTime(data.waitlist.length);      
    });   
};

Helpers.prototype.determineWaitTime = function determineWaitTime(numberWaiting) {
  var waitTime = numberWaiting * AVG_WAIT_TIME;
  return waitTime; 
};

module.exports = new Helpers();
