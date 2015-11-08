'use strict';

angular.module('nodedenverApp')
  .controller('RestaurantCtrl', function ($scope, $location, restClient, geolocation) {
    var _this = this;

    angular.extend(_this, {

      initialize: function initialize() {
        $scope.loading = true;

        _this.getPosition()
          .then(function(data) {
            return data.data.businesses[0];
          })
          .then(function(restaurant) {
            $scope.loading = false;
            $scope.restaurant = _.pick(restaurant, 'name', 'id', 'image_url');
            return restaurant;
          })
          .then(function(restaurant) {
            console.log($location);
            //$location.url() += '?id=' + restaurant.id;
            return restClient.restaurant.getWaitlist(restaurant.id);
          })
          .then(function(waitlist) {
            $scope.waitlist = waitlist;
          })
          .catch(function(error) {
            $scope.error = error;
          });
      },

      getPosition: function getPosition() {
        return geolocation.getCurrentLocation({enableHighAccuracy: true})
          .then(function(position) {
            return restClient.location.get(position.coords);
        });
      }
    });

    _this.initialize();

  });
