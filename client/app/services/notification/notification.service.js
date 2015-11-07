'use strict';

angular.module('nodedenverApp')
  .service('notification', function ($window, $q) {

    return {
    
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
        if (this.hasNotificationApi()) {
          this.getNotification().requestPermission(function(permission) {
            if (permission === 'granted') {
              deferred.resolve();
            } else {
              deferred.reject(permission);
            }
          });
        }
        return deferred.promise;
      }

    };
  });
