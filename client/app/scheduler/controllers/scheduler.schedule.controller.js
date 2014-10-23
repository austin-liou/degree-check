'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerScheduleCtrl', function ($scope, scheduleService, majorService) {
    console.log('SchedulerScheduleCtrl');
    $scope.scheduleService = scheduleService;
    $scope.majorService = majorService;
    $scope.allCourses = majorService.allCourses.map(function (elem) { return elem.name; });

    $scope.addCourse = function (semesterId) {
    	scheduleService.addCourse(semesterId, { name: '' });
    };

    $scope.removeCourse = function (semesterId, courseId) {
    	scheduleService.removeCourse(semesterId, courseId);
    };

    $scope.updateCourse = function (semesterId, courseId, updatedCourse) {
    };

    $scope.addSemester = function () {
    	scheduleService.addSemester('Summer', 2018);
    };

    $scope.checkInput = function (event, semesterId, inputCourse) {
        // Check if enter
        if (event.keyCode === 13) {
            // Check if valid course
            if ($scope.allCourses.indexOf(inputCourse) > -1) {
                scheduleService.addCourse(semesterId, { name: inputCourse });
            }
        }
    };

  });
