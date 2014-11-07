'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerDeleteScheduleCtrl', function ($scope, $modalInstance, majorService, scheduleService) {
    console.log('SchedulerDeleteScheduleCtrl');
    $scope.majorService = majorService;
    $scope.scheduleService = scheduleService;

    $scope.deleteSchedule = function () {
    	scheduleService.deleteSchedule(scheduleService.currSchedule._id);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  });
