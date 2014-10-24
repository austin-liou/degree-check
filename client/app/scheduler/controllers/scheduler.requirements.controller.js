'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerRequirementsCtrl', function ($scope, majorService, scheduleService) {
    console.log('SchedulerRequirementsCtrl');
    $scope.majorService = majorService;
    $scope.scheduleService = scheduleService;
  });
