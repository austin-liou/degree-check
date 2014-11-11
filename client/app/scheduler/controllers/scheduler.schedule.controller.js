'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerScheduleCtrl', function ($scope, scheduleService, majorService, $modal, $http) {
    console.log('SchedulerScheduleCtrl');
    $scope.scheduleService = scheduleService;
    $scope.majorService = majorService;
    $scope.allCourses = majorService.allCourses.map(function (elem) { return elem.name; });
    $scope.newClass = {};


    $http.get('/api/uid')
      .success(function (uidObj){
        scheduleService.initSchedule(uidObj.uid);
      });

    /*
        Modal Logic
    */
    $scope.addSchedule = function () {
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

    $scope.deleteSchedule = function () {
        var modalInstance = $modal.open({
            templateUrl: 'scheduler.delete-schedule.html',
            controller: 'SchedulerDeleteScheduleCtrl',
            size: 'sm'
        });
    };

    $scope.changeSchedule = function (scheduleId) {
      scheduleService.changeSchedule(scheduleId);
    }

    /*
        Schedule Logic
    */
    $scope.removeCourse = function (semesterId, courseName) {
    	scheduleService.removeCourse(semesterId, courseName);
    };

    $scope.updateCourse = function (semesterId, courseId, updatedCourse) {
    };

    $scope.addYear = function () {
    	scheduleService.addSemester('Fall', 2018);
      scheduleService.addSemester('Spring', 2019);
      scheduleService.addSemester('Summer', 2019);
    };

    $scope.checkInput = function (event, semesterId) {
      // Check if enter
      if (event.keyCode === 13) {
          // Check if valid course
          if ($scope.allCourses.indexOf($scope.newClass[semesterId]) > -1) {
              scheduleService.addCourse(semesterId, { name: $scope.newClass[semesterId],
                                                      units: majorService.allCoursesHash[$scope.newClass[semesterId]]});
              $scope.newClass[semesterId] = '';
          }
      }
    };

    $scope.saveSchedule = function () {
      scheduleService.saveSchedule();
    };

  });
