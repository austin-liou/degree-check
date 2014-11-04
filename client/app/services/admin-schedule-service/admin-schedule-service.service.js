'use strict';

angular.module('degreeCheckApp')
  .factory('adminScheduleService', function () {
    var service = {};

    service.getAllStudents = (function () {
      return $http.get('/api/users/')
        .success(function (allStudents) {
          service.allStudents = allStudents;
        })
    })();

    return service;
});