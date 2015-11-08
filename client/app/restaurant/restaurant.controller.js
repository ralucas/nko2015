'use strict';

angular.module('nodedenverApp')
  .controller('RestaurantCtrl', function ($scope, $location, restClient, geolocation) {
    var _this = this;

    var columnDefs = [{
      name: 'partyName',
      enableCellEdit: true,
      menuItems: [{
        title: 'Party Name'
      }]
    }, {
      name: 'partySize',
      enableCellEdit: true,
      menuItems: [{
        title: 'Party Size'
      }]
    }, {
      name: '_id',
      visible: false
    }, {
      name: 'time',
      type: 'date',
      menuItems: [{
        title: 'Arrival Time'
      }]
    }];

   $scope.getCurrentWaitTime = function() {
     return $scope.waitTime + ' minutes';
   };

    angular.extend(_this, {

      initialize: function initialize() {
        $scope.loading = true;
        $scope.gridOpts = {
          enableSorting: true,
          enableFiltering: true,
          columnDefs: columnDefs
        };

        _this.getPosition()
          .then(function(data) {
            console.log(data);
            return data.data;
          })
          .then(function(response) {
            $scope.loading = false;
            $scope.waitTime = response.waitTime;
            $scope.restaurant = _.pick(response.restaurant, 'name', 'id', 'image_url');
            return response.restaurant;
          })
          .then(function(restaurant) {
            console.log($location);
            //$location.url() += '?id=' + restaurant.id;
            var waiting = $scope.waitlist ? $scope.waitlist.length : null;
            return restClient.restaurant.getWaitlist(restaurant.id, waiting);
          })
          .then(function(waitlist) {
            console.log(waitlist.data);
            $scope.waitlist = waitlist.data.waitlist;
            $scope.waitTime = waitlist.data.waitTime;
            $scope.gridOpts.data = waitlist.data.waitlist;
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
