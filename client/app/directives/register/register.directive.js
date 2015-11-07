'use strict';

angular.module('nodedenverApp')
  .directive('register', function () {
    return {
      templateUrl: 'app/directives/register/register.html',
      restrict: 'EA',
      link: function link(scope, element, attrs) {
        console.log(scope, element);
      }
    };
  });
