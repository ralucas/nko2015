'use strict';

angular.module('nodedenverApp')
  .controller('MainCtrl', function ($scope, Modal, geolocation, restClient) {
    var _this = this;

    $scope.showModal = function showModal() {
      Modal.openRegistration();
    };

    angular.extend(_this, {

      initialize: function initialize() {
        _this.getPosition()
          .then(function(data) {
            console.log('received', data);
            return data.data.businesses[0];
          })
          .then(function(restaurant) {
            $scope.restaurant = _.pick(restaurant, 'name', 'id', 'image_url');
          });
      },

      getPosition: function getPosition() {
        return geolocation.getCurrentLocation({enableHighAccuracy: true})
          .then(function(position) {
            console.log('position:', position);
            console.log(restClient);
            return restClient.location.get(position.coords);
        });
      }
    });

    _this.initialize();

  });
