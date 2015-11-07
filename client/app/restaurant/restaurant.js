'use strict';

angular.module('nodedenverApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('restaurant', {
        url: '/restaurant',
        templateUrl: 'app/restaurant/restaurant.html',
        controller: 'RestaurantCtrl'
      });
  });