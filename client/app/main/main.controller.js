'use strict';

angular.module('nodedenverApp')
  .controller('MainCtrl', function ($scope, $http, geolocation, restClient) {

    geolocation.getCurrentLocation()
      .then(function(position) {
        console.log(position);
      });

    //$http.get('/api/things').success(function(awesomeThings) {
      //$scope.awesomeThings = awesomeThings;
    //});



  });
