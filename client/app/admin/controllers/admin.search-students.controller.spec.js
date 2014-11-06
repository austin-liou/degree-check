'use strict';

describe('Controller: AdminSearchStudentsCtrl', function () {

  // load the controller's module
  beforeEach(module('degreeCheckApp'));

  var AdminSearchStudentsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminSearchStudentsCtrl = $controller('AdminSearchStudentsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
