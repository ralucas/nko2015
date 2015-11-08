var yelp = require('yelp');
var Q = require('q');
var _ = require('lodash');

function YelpService(config) {
  config = config || {};

  this.config = _.extend({
    consumer_key: 'm1TvMHSF7PoLTIwV85NxbA', 
    consumer_secret: '6u8JIKkDxYrVWVXmBsLSYPOnb5s',
    token: '_awxcfRsxMVasHHgxZCjc9w8E_9ytdQe',
    token_secret: 'g10FIqW_KS8vjIx9dCotKWSRXHU' 
  }, config); 

  if (this.config.client) {
    this.client = this.config.client;
  } else {
    this.client = yelp.createClient(this.config);
  }
}



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
