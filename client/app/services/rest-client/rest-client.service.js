'use strict';

angular.module('nodedenverApp')
  .service('restClient', function ($http, $resource) {

    return {
    
      location: function location(coords) {
        return $resource('/api/location/:coords', coords); 
      }
    
    };

  });
