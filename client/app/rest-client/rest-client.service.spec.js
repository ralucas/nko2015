'use strict';

describe('Service: restClient', function () {

  // load the service's module
  beforeEach(module('nodedenverApp'));

  // instantiate service
  var restClient;
  beforeEach(inject(function (_restClient_) {
    restClient = _restClient_;
  }));

  it('should do something', function () {
    expect(!!restClient).toBe(true);
  });

});
