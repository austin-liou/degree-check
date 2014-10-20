'use strict';

angular.module('degreeCheckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scheduler', {
        url: '/scheduler',
        templateUrl: 'app/scheduler/templates/scheduler.html',
        controller: 'SchedulerCtrl',
        views: {
        	'': {
        		templateUrl: 'app/scheduler/templates/scheduler.html',
                controller: 'SchedulerCtrl'
        	},
        	'header@scheduler': {
        		templateUrl: 'components/header/header.html',
        		controller: 'HeaderCtrl'
        	},
        	'schedule@scheduler': {
        		templateUrl: 'app/scheduler/templates/scheduler.schedule.html',
        		controller: 'SchedulerScheduleCtrl'
        	},
        	'requirements@scheduler': {
        		templateUrl: 'app/scheduler/templates/scheduler.requirements.html',
        		controller: 'SchedulerRequirementsCtrl'
        	},
        	'footer@scheduler': {
        		templateUrl: 'components/footer/footer.html',
        		controller: 'FooterCtrl'
        	}
        }
      });
  });