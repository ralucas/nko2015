'use strict';

angular.module('nodedenverApp')
  .controller('MainCtrl', function ($scope, Modal, geolocation, restClient) {
    var _this = this;

    $scope.showModal = function showModal() {
      Modal.openRegistration();
    };

    //Mock data
    $scope.restaurant = {
      name: 'Test Restaurant',
      imageUrl: 'http://www.mcdonalds.com/etc/designs/mcdonalds/en/_jcr_content/genericpage/genericpagecontent/sitelevelconfiguration/logoimage.img.png'
    };

    angular.extend(_this, {

      initialize: function initialize() {
        _this.getPosition()
          .then(function(data) {
            console.log('received', data);
            return data;
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
