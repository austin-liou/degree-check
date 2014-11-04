'use strict';

angular.module('degreeCheckApp')
  .controller('AdminCtrl', function ($scope, adminScheduleService) {
  	console.log('AdminCtrl');
    $scope.adminScheduleService = adminScheduleService;
  });
