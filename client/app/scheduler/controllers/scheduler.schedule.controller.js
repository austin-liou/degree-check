'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerScheduleCtrl', function ($scope, scheduleService, majorService, $modal) {
    console.log('SchedulerScheduleCtrl');
    $scope.scheduleService = scheduleService;
    $scope.majorService = majorService;
    $scope.allCourses = majorService.allCourses.map(function (elem) { return elem.name; });
    $scope.newClass = {};

    /*
        Modal Logic
    */
    $scope.addSchedule = function() {
        var modalInstance = $modal.open({
            templateUrl: 'scheduler.add-schedule.html',
            controller: 'SchedulerAddScheduleCtrl',
            size: 'sm'
        });

        /*
            schedule - an object containing the name and major of the new schedule
            { name: String, major: majorId }
        */
        modalInstance.result.then(function (schedule) {
            // Add scheduleService logic to create schedule here
        });
    };

    /*
        Schedule Logic
    */
    $scope.removeCourse = function (semesterId, courseId) {
    	scheduleService.removeCourse(semesterId, courseId);
    };

    $scope.updateCourse = function (semesterId, courseId, updatedCourse) {
    };

    $scope.addSemester = function () {
    	scheduleService.addSemester('Summer', 2018);
    };

    $scope.checkInput = function (event, semesterId) {
        // Check if enter
        if (event.keyCode === 13) {
            // Check if valid course
            if ($scope.allCourses.indexOf($scope.newClass[semesterId]) > -1) {
                scheduleService.addCourse(semesterId, { name: $scope.newClass[semesterId] });
                $scope.newClass[semesterId] = '';
            }
        }
    };

  });
