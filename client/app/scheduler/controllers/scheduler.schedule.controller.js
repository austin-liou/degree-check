'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerScheduleCtrl', function ($scope, scheduleService, majorService, $modal, $http) {
    console.log('SchedulerScheduleCtrl');
    $scope.scheduleService = scheduleService;
    $scope.majorService = majorService;
    $scope.majorService.initMajorService(function (courses) {
      $scope.allCourses = courses.map(function (elem) { return elem.name; });
    });
    $scope.newClass = {};


    // $http.get('/api/uid')
    //   .success(function (uidObj){
    //     scheduleService.initSchedule(uidObj.uid);
    //   });
    scheduleService.initSchedule('hi');
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
            scheduleService.addSchedule(schedule, function() {
                schedule = scheduleService.schedule.schedules[scheduleService.schedule.schedules.length-1];
                $scope.changeSchedule(schedule._id);
            });
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
          var index = $scope.allCourses.indexOf($scope.newClass[semesterId]);
          if (index > -1) {
            var courseObj = majorService.allCourses[index];
            scheduleService.addCourse(semesterId, courseObj);
            $scope.newClass[semesterId] = '';
          }
      }
    };

    $scope.saveSchedule = function () {
      scheduleService.saveSchedule();
    };

  });
