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
        getWaitlist: function get(id, waitlistQty) {
          var url = apiRoot + 'restaurant/waitlist?id=' + id;
          if (waitlistQty) {
            url += 'waiting=' + waitlistQty;
          }

          return $http({
            method: 'GET',
            url: url,
            cache: false 
          });
        }
      }
    };

  });
