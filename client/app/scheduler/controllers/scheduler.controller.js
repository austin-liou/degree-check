'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerCtrl', function ($scope, scheduleService) {
    $scope.scheduleService = scheduleService;
  });
