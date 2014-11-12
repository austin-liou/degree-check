'use strict';

angular.module('degreeCheckApp')
  .factory('adminScheduleService', function ($http) {
    var service = {};

    //list of users
    service.students = [];

    //GET all existing users from server
    service.getStudents = function () {
      return $http.get('/api/users/')
        .success(function (students) {
          service.students = students;
        })
    };

    return service;
});
