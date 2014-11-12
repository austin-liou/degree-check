'use strict';

angular.module('degreeCheckApp')
  .controller('HeaderCtrl', function ($scope, $location, scheduleService) {
  	$scope.scheduleService = scheduleService;
  });
