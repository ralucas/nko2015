'use strict';

angular.module('nodedenverApp')
  .service('restClient', function ($http, $resource) {

    var apiRoot = '/api/';

    return {
    
      location: {
        get: function get(coords) {
          var url = apiRoot + 'location?' +
            'latitude=' + coords.latitude + 
            '&longitude=' + coords.longitude; 
          return $http({
            method: 'GET',
            url: url,
            cache: true 
          }); 
        }
      },

      restaurant: {
        put: function put(reservation) {
          return $http({
            method: 'PUT',
            url: apiRoot + 'restaurant',
            data: reservation
          });
        },
        getWaitlist: function get(id) {
          var url = apiRoot + 'restaurant/waitlist?id=' + id;
          return $http({
            method: 'GET',
            url: url,
            cache: false 
          });
        }
      }
    };

  });
