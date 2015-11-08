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

YelpService.prototype.searchByLocation = function searchByLocation(lat, long) {
  var latlong = lat + ', ' + long;
  console.log(this.client, latlong);
  var deferred = Q.defer();
  this.client.search({term: 'restaurants', ll: latlong}, function(error, data) {
    if (error) deferred.reject(error);
    deferred.resolve(data);
  });
  return deferred.promise;
};

module.exports = YelpService;
