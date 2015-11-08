var services = require('../services');
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
  return services.mongoService.findById(restaurant.id, 'Reservation')
    .then(function(restaurantData) {
      return restaurantData.waitlist;
    });
};

module.exports = RestaurantManager;
