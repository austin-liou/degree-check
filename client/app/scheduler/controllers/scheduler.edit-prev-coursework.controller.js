'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerEditPrevCourseworkCtrl', function ($scope, $modalInstance) {
    console.log('SchedulerEditPrevCourseworkCtrl');

    $scope.done = function () {
        $modalInstance.close();
    };

  });
