'use strict';

angular.module('nodedenverApp')
  .controller('MainCtrl', function ($scope, $http, geolocation, restClient) {

    geolocation.getCurrentLocation(function(pos) {
      console.log(pos);
    });

    //$http.get('/api/things').success(function(awesomeThings) {
      //$scope.awesomeThings = awesomeThings;
    //});



  });
