'use strict';

describe('Service: adminScheduleService', function () {

  // load the service's module
  beforeEach(module('degreeCheckApp'));

  // instantiate service
  var adminScheduleService;
  beforeEach(inject(function (_adminScheduleService_) {
    adminScheduleService = _adminScheduleService_;
  }));

  it('should do something', function () {
    expect(!!adminScheduleService).toBe(true);
  });

});
