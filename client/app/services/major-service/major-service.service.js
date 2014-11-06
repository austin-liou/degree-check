'use strict';

angular.module('degreeCheckApp')
  .factory('majorService', function () {
    var service = {};

    service.allCourses = [
    							{ 'name': 'CS 61A', '_id': '1' },
    							{ 'name': 'CS 61B', '_id': '2' },
    							{ 'name': 'CS 160', '_id': '3' },
    							{ 'name': 'CS 169', '_id': '4' }
    						];

    service.allCoursesHash = {
        'CS 61A': '1',
        'CS 61B': '2',
        'CS 61C': '3',
        'CS 160': '3',
        'CS 169': '3'
    };

    service.allMajors = [ { name: 'CS', id: 1}, { name: 'EECS', id: 2} ];

    // service.getAllClasses = (function () {
    // 	return $http.get('/api/courses/')
    //     .success(function (allCourses) {
    //       service.allCourses = allCourses;
    //     })
    // })();

    return service;
  });
