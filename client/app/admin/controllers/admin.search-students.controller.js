'use strict';

angular.module('degreeCheckApp')
  .controller('AdminSearchStudentsCtrl', function ($scope, adminScheduleService) {
  	console.log('AdminSearchStudentsCtrl');
    $scope.adminScheduleService = adminScheduleService;
    $scope.adminScheduleService.getStudents()
      .success(function (res) {
    	$scope.students = $scope.adminScheduleService.students;
      });
    $scope.studentName = function(student) {
    	return student.name;
    };
    $scope.filterSearch = function(name, email, uid) {
    	name = name === undefined ? "" : name.toLowerCase();
    	email = email === undefined ? "" : email.toLowerCase();
    	uid = uid === undefined ? "" : uid.toLowerCase();
    	return function(student) {
    		try {
    			if (name === student.name.substring(0, name.length).toLowerCase() && email === student.name.substring(0, email.length).toLowerCase()) {
    				return true;
    			}
    		} catch(err) {}
    		return false;
    	};
    }
  });