'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerAddScheduleCtrl', function ($scope, $modalInstance, majorService) {
    console.log('SchedulerAddScheduleCtrl');
    $scope.majorService = majorService;

    $scope.createSchedule = function (newScheduleName, newScheduleMajor) {
    	var schedule = { name: newScheduleName, major: newScheduleMajor };
        $modalInstance.close(schedule);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  });
