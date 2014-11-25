'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerEditPrevCourseworkCtrl', function ($scope, $modalInstance, scheduleService, majorService) {
    console.log('SchedulerEditPrevCourseworkCtrl');
    $scope.scheduleService = scheduleService;
    $scope.majorService = majorService;
    $scope.majorService.initMajorService(function (courses) {
      $scope.allCourses = courses.map(function (elem) { return elem.name; });
    });
    $scope.prev_coursework = $scope.scheduleService.schedule.prev_coursework;
    $scope.newClass = '';
    
    $scope.checkInput = function (event, id) {
      // Check if enter
      if (event.keyCode === 13) {
          // Check if valid course
          var index = $scope.allCourses.indexOf($scope.newClass);
          if (index > -1) {
            var courseObj = majorService.allCourses[index];
            scheduleService.addCourse(id, courseObj);
            $scope.newClass = '';
            $scope.scheduleService.schedule.prev_coursework.push(courseObj);
            $scope.prev_coursework = $scope.scheduleService.schedule.prev_coursework;
            $scope.scheduleService.saveSchedule();
          }
      }
    };

    $scope.done = function () {
        $modalInstance.close();
    };

  });
