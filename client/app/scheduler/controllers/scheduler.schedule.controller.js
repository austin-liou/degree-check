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

    var init = (function () {
      $http.get('/authentication/uid')
        .success(function (uidObj){
          scheduleService.initSchedule(uidObj.uid);
        });
    })();

    //setup modal for editing prev coursework
    $scope.editPrevCoursework = function() {
        var modalInstance = $modal.open({
            templateUrl: 'scheduler.edit-prev-coursework.html',
            controller: 'SchedulerEditPrevCourseworkCtrl',
            size: 'sm'
        });

        modalInstance.result.then(function (schedule) {
        });
    };
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
                //switch focus to new schedule on creation
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
    $scope.removeCourse = function (semesterId, courseName, course) {
      if(course) course.deleting = false;
    	scheduleService.removeCourse(semesterId, courseName);
      scheduleService.saveSchedule();
      };

    $scope.updateCourse = function (semesterId, courseId, updatedCourse) {
    };

    //add a new year to schedule
    $scope.addYear = function (years) {
      var year = years[years.length-1];
      scheduleService.addYear(year);
    };

    //delete a year from schedule
    $scope.deleteYear = function () {
      scheduleService.deleteYear();
    };

    $scope.checkInput = function (event, semesterId) {
      // Check if enter
      if (event.keyCode === 13) {
          // Check if valid course
          var index = $scope.allCourses.indexOf($scope.newClass[semesterId]);
          if (index > -1) {
            var courseObj = majorService.allCourses[index];
            // Check if course is already in current schedule
            if (!scheduleService.classInSchedule(courseObj.name)) {
              scheduleService.addCourse(semesterId, courseObj);
              scheduleService.saveSchedule().then(function () {
                $scope.newClass[semesterId] = '';
              });
            }
          }
      }
    };

    $scope.saveSchedule = function () {
      scheduleService.saveSchedule();
    };

  });
