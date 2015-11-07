'use strict';

angular.module('nodedenverApp')
  .service('geolocation', function ($window) {

    var _this = this;

    _.extend(_this, {

      getNavigator: function() {
        return navigator || $window.navigator;
      },

      hasGeolocation: function() {
        return 'geolocation' in _this.getNavigator();
      },

      getCurrentLocation: function(callback) {
        var navigator = _this.getNavigator();
        return navigator.geolocation.getCurrentPosition(callback);
      }

    });

  })
  ;
