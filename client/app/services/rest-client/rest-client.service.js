'use strict';

angular.module('nodedenverApp')
  .service('restClient', function ($http, $resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var _this = this;

    _.extend(_this, {
    
      setLocation: function(coords) {
        return $resource('/location/:coords'); 
      }
    
    });

  });
