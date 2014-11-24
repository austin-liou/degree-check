'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerEditPrevCourseworkCtrl', function ($scope, $modalInstance) {
    console.log('SchedulerEditPrevCourseworkCtrl');

    $scope.save = function (courses) {
        console.log(courses);
        $modalInstance.close(courses);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  });
