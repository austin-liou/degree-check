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
    service.allMajors = [ { name: 'CS', id: 1}, { name: 'EECS', id: 2} ];

    // service.getAllClasses = (function () {
    // 	return $http.get('/api/courses/')
    //     .success(function (allCourses) {
    //       service.allCourses = allCourses;
    //     })
    // })();
    service.saveRequirement = function(requirement, cb){
        //look up major id
        var url = '/api/majors/'; // + major id
        //var major = get major object
        var i = 0;
        for( i; i < major.requirements.length; i++) {
            if (major.requirements[i]._id == requirement._id) {
                major.requirements[i] == requirement;
                break;
            }
        }
        if( i == major.requirements.length){
            major.requirements.push(requirement);
        }
        return $http.put(url, major);
    }

    return service;
  });
