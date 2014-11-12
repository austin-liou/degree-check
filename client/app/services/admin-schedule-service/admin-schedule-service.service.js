'use strict';

angular.module('degreeCheckApp')
  .factory('adminScheduleService', function ($http) {
    var service = {};

    service.students = [];

    service.getStudents = function () {
      return $http.get('/api/users/')
        .success(function (students) {
          service.students = students;
        })
    };

    return service;
});