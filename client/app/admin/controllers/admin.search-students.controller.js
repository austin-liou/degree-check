'use strict';

angular.module('degreeCheckApp')
  .controller('AdminSearchStudentsCtrl', function ($scope, adminScheduleService) {
  	console.log('AdminSearchStudentsCtrl');
    $scope.adminScheduleService = adminScheduleService;
    
    //GET all users via adminScheduleService
    $scope.adminScheduleService.getStudents()
      .success(function (res) {
    	$scope.students = $scope.adminScheduleService.students;
      });
      
    //sort students on HTML view by first name
    $scope.studentName = function(student) {
    	return student.name;
    };
    
    //custom filter for searching students by name, email, and uid.
    //this filter is stricter than the default one in that it checks the input against
    //the start of the string
    $scope.filterSearch = function(name, email, uid) {
    	name = name === undefined ? "" : name.toLowerCase();
    	email = email === undefined ? "" : email.toLowerCase();
    	uid = uid === undefined ? "" : uid.toLowerCase();
    	return function(student) {
    		try {
    			if (name === student.name.substring(0, name.length).toLowerCase())
    				if (email === student.email.substring(0, email.length).toLowerCase())
    					if (uid === student.uid.substring(0, uid.length).toLowerCase())
    						return true;
    		} catch(err) {}
    		return false;
    	};
    };
  });
