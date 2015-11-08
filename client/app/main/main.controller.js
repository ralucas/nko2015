'use strict';

angular.module('nodedenverApp')
  .controller('MainCtrl', function ($scope, Modal, geolocation, restClient) {
    var _this = this;

    $scope.showModal = function showModal() {
      Modal.openRegistration();
    };

    $scope.showRegistration = function showRegistration() {
      if (! $scope.inRegistration) {
        $scope.inRegistration = true; 
      }
    };

    $scope.cancelRegistration = function cancelRegistration() {
      $scope.inRegistration = false;
      // Send cancellation to backend
      // And report it to the admin side
    };

    angular.extend(_this, {

      initialize: function initialize() {
        _this.getPosition()
          .then(function(data) {
            return data.data.businesses[0];
          })
          .then(function(restaurant) {
            $scope.restaurant = _.pick(restaurant, 'name', 'id', 'image_url');
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
