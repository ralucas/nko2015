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
            cache: false 
          }); 
        }
      }
    };

  });
