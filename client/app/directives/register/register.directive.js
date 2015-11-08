'use strict';

angular.module('nodedenverApp')
  .directive('register', function () {
    return {
      templateUrl: 'app/directives/register/register.html',
      restrict: 'EA',
      link: function link(scope, element, attrs, ctrl) {

        scope.customer = scope.customer || {};

        scope.registerCustomer = function registerCustomer(customer) {
          scope.inRegistration = false;
          scope.isRegistered = true;
          ctrl.setCustomer(customer);
        };
      }
    };
  })
  .controller('RegisterCtrl', function($scope, restClient) {
    var _this = this;
    angular.extend(_this, {
      setCustomer: function setCustomer(customer) {
        var reservation = _.extend(customer, $scope.restaurant);
        return restClient.restaurant.put(reservation)
          .catch(function(error) {
            $scope.error = error;
          });
      }
    });
  });
