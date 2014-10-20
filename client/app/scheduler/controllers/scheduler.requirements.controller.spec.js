'use strict';

describe('Controller: SchedulerRequirementsCtrl', function () {

  // load the controller's module
  beforeEach(module('degreeCheckApp'));

  var SchedulerRequirementsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SchedulerRequirementsCtrl = $controller('SchedulerRequirementsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
