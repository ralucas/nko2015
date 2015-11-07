'use strict';

angular.module('nodedenverApp')
  .service('notification', function ($window, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var _this = that;

    _.extend(_this, {
    
      getNotification: function getNotification() {
        return Notification || $window.Notification;
      },

      hasNotificationApi: function hasNotificationApi() {
        return Notification in $window;
      },

      create: function create(title, options) {
        return new getNotification()(title, options);
      },

      /**
       * @return {object} promise Permission
       **/ 
      requestPermission: function requestPermission() {
        var deferred = $q.defer();
        if (_this.hasNotificationApi()) {
          _this.getNotification().requestPermission(function(permission) {
            if (permission === 'granted') {
              deferred.resolve();
            } else {
              deferred.reject(permission);
            }
          });
        }
        return deferred.promise;
      }

    });
  });
