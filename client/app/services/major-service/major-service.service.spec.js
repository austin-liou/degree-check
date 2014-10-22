'use strict';

describe('Service: majorService', function () {

  // load the service's module
  beforeEach(module('degreeCheckApp'));

  // instantiate service
  var majorService;
  beforeEach(inject(function (_majorService_) {
    majorService = _majorService_;
  }));

  it('should do something', function () {
    expect(!!majorService).toBe(true);
  });

});
