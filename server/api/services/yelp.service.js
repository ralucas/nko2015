var yelp = require('yelp');
var Q = require('q');
var _ = require('lodash');

function YelpService(config) {
  config = config || {};

  this.config = _.extend({
    consumer_key: process.env.YELP_CONSUMER_KEY, 
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET 
  }, config); 

  if (this.config.client) {
    this.client = this.config.client;
  } else {
    this.client = yelp.createClient(this.config);
  }
}

/**
 * Searches Yelp for restaurants given lat and long
 * @param {float} lat - Latitude
 * @param {float} long - Longitude
 * @param {int} radius - Radius for the search
 *
 * @return {object} promise - Promise returns array of restaurants
 **/ 
YelpService.prototype.searchByLocation = function searchByLocation(lat, long, radius) {
  var latlong = lat + ', ' + long;
  var deferred = Q.defer();
  this.client.search({category_filter: 'restaurants', radius_filter: radius, ll: latlong}, function(error, data) {
    if (error) deferred.reject(error);
    deferred.resolve(data);
  });
  return deferred.promise;
};

module.exports = YelpService;
