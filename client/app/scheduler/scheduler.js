'use strict';

angular.module('degreeCheckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scheduler', {
        url: '/scheduler',
        templateUrl: 'app/scheduler/scheduler.html',
        controller: 'SchedulerCtrl'
      });
  });