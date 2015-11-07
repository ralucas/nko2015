'use strict';

angular.module('nodedenverApp')
  .service('geolocation', function ($window, $q) {

    var _this = this;

    _.extend(_this, {

      getNavigator: function() {
        return navigator || $window.navigator;
      },

      hasGeolocation: function() {
        return 'geolocation' in _this.getNavigator();
      },

      /**
       * @param {object} options
       * @return {object} promise
       **/ 
      getCurrentLocation: function(options) {
        var navigator = _this.getNavigator();
        var deferred = $q.defer();
        navigator.geolocation
          .getCurrentPosition(function(position) {
            deferred.resolve(position); 
          }, function(error) {
            deferred.reject(error);
          }, options); 
        return deferred.promise;
      },

      watchCurrentLocation: function() {
      
      }

    });

  })
  ;
