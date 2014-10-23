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

    // service.getAllClasses = (function () {
    // 	return $http.get('/api/courses/')
    //     .success(function (allCourses) {
    //       service.allCourses = allCourses;
    //     })
    // })();

    return service;
  });
