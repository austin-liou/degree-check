'use strict';

angular.module('degreeCheckApp')
  .controller('AdminViewStudentsCtrl', function ($scope, scheduleService, majorService, $modal, $http, $stateParams) {
    console.log('AdminViewStudentsCtrl');
    $scope.scheduleService = scheduleService;
    $scope.majorService = majorService;
    $scope.majorService.initMajorService(function (courses) {
      $scope.allCourses = courses.map(function (elem) { return elem.name; });
    });
    $scope.newClass = {};

    var init = (function () {
      $scope.scheduleService.initSchedule($stateParams.uid, function() {
        $scope.scheduleService.schedule.name = '';
      });
    })();

    $scope.saveSchedule = function () {
      scheduleService.saveSchedule();
    }

    $scope.editPrevCoursework = function() {
        var modalInstance = $modal.open({
            templateUrl: 'scheduler.edit-prev-coursework.html',
            controller: 'SchedulerEditPrevCourseworkCtrl',
            size: 'sm'
        });

        modalInstance.result.then(function (schedule) {
        });
    };

    $scope.changeSchedule = function (scheduleId) {
      scheduleService.changeSchedule(scheduleId);
    }

    $scope.checkInput = function (event, semesterId) {
      // Check if enter
      if (event.keyCode === 13) {
          // Check if valid course
          var index = $scope.allCourses.indexOf($scope.newClass[semesterId]);
          if (index > -1) {
            var courseObj = majorService.allCourses[index];
            scheduleService.addCourse(semesterId, courseObj);
            $scope.newClass[semesterId] = '';
          }
      }
    };
  });
