var services = require('../services');
var helpers = require('../helpers');
var _ = require('lodash');

function RestaurantManager() {}

RestaurantManager.prototype.save = function(reservation) {
  reservation._id = reservation.id;
  var waitlist = _.pick(reservation, 'partyName', 'partySize');
  reservation.waitlist = waitlist;
  //return services.redisService.method('hmset', reservation.id);  	
  return services.mongoService.updateOrAdd(reservation, 'Reservation');
}

RestaurantManager.prototype.getWaitlist = function getByLocation(restaurant) {
  var waitlistQty = restaurant.waiting;
  return services.mongoService.findById(restaurant.id, 'Reservation')
    .then(function(restaurantData) {
      var waitTime = helpers.determineWaitTime(restaurantData.waitlist.length);
      return {
        waitlist: restaurantData.waitlist,
        waitTime: waitTime
      };
    });
};

module.exports = RestaurantManager;
