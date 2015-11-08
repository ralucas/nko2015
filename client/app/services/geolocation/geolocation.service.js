'use strict';

angular.module('nodedenverApp')
  .service('geolocation', function ($window, $q) {

    return {

      getNavigator: function getNavigator() {
        return navigator || $window.navigator;
      },

      hasGeolocation: function hasGeolocation() {
        return 'geolocation' in this.getNavigator();
      },

      /**
       * @param {object} options
       * @return {object} promise
       **/ 
      getCurrentLocation: function getCurrentLocation(options) {
        var navigator = this.getNavigator();
        var deferred = $q.defer();
        navigator.geolocation
          .getCurrentPosition(function(position) {
            console.log(position);
            deferred.resolve(position); 
          }, function(error) {
            deferred.reject(error);
          }, options); 
        return deferred.promise;
      },

      /**
       * @param {object} options
       * @return {object} promise
       **/ 
      watchCurrentLocation: function watchCurrentLocation(options) {
        var navigator = this.getNavigator();
        var deferred = $q.defer();
        navigator.geolocation
          .watchCurrentPositiont(function(position) {
            deferred.resolve(position); 
          }, function(error) {
            deferred.reject(error);
          }, options); 
        return deferred.promise;
      }

    };

  })
  ;
