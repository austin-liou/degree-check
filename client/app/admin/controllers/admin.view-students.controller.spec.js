'use strict';

describe('Controller: ViewStudentsCtrl', function () {

  // load the controller's module
  beforeEach(module('degreeCheckApp'));

  var ViewStudentsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewStudentsCtrl = $controller('AdminViewStudentsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
