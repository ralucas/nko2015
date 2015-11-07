'use strict';

describe('Controller: RestaurantCtrl', function () {

  // load the controller's module
  beforeEach(module('nodedenverApp'));

  var RestaurantCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RestaurantCtrl = $controller('RestaurantCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
