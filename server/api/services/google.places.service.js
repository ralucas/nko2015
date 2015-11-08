var request = require('request');
var Q = require('q');
var _ = require('lodash');

function GooglePlacesService(config) {
  config = config || {};

  this.config = _.extend({
    apiKey: process.env.GOOGLE_API_KEY, 
    rootUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
  }, config); 

}

GooglePlacesService.prototype.searchByLocation = function searchByLocation(params) {
  var latlong = 'location=' + params.latitude + ', ' + params.longitude;
  var radius = '&radius=500';
  var types = '&types=food';
  var url = this.rootUrl + latlong + radius + types + '&key=' + this.apiKey;
  return Q.ninvoke(request, 'get', url);
};

module.exports = GooglePlacesService;

