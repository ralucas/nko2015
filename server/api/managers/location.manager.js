var services = require('../services');

function LocationManager() {}

LocationManager.prototype.getLocation = function(coords) {
  return services.yelpService.searchByLocation(coords.latitude, coords.longitude);
}

module.exports = LocationManager;
