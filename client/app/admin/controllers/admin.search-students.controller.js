'use strict';

angular.module('degreeCheckApp')
  .controller('AdminSearchStudentsCtrl', function ($scope, adminScheduleService) {
  	console.log('AdminSearchStudentsCtrl');
    $scope.adminScheduleService = adminScheduleService;
    $scope.adminScheduleService.getStudents()
      .success(function (res) {
    	$scope.students = $scope.adminScheduleService.students;
      });
  });