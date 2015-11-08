var services = require('../services');

function LocationManager() {}

LocationManager.prototype.getLocation = function(coords, radius) {
  var _this = this;
  radius = radius || 200;
  
  if (!coords) throw new Error('I need coordinates!');

  var yelpPrm = services.yelpService.searchByLocation(coords.latitude, coords.longitude, radius);
  
  return yelpPrm.then(function(response) {
  	console.log(response);
  	if (response.businesses.length > 0) {
  	  return response;
 	} else {
      radius += 100;
      return _this.getLocation(coords, radius);
  	}
  });
}

module.exports = LocationManager;
