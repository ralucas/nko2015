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
      if (!restaurantData) {
        var rest = _.pluck(restaurant, 'id', 'image_url', 'name')
        rest._id = restaurant.id;
        return services.mongoService.add(rest, 'Reservation')
          .then(function(data) {
            return {
              waitlist: [],
              waitTime: 0
            };
          });
      }
      var waitTime = helpers.determineWaitTime(restaurantData.waitlist.length);
      return {
        waitlist: restaurantData.waitlist,
        waitTime: waitTime
      };
    });
};

module.exports = RestaurantManager;
