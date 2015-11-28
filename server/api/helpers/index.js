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
      var numberWaiting = data && data.waitlist ? data.waitlist.length : 0;
      return _this.determineWaitTime(numberWaiting);      
    });   
};

Helpers.prototype.determineWaitTime = function determineWaitTime(numberWaiting) {
  numberWaiting = numberWaiting || 0;
  var waitTime = numberWaiting * AVG_WAIT_TIME;
  return waitTime; 
};

module.exports = new Helpers();
