'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerScheduleCtrl', function ($scope, requirementService) {
    console.log('SchedulerScheduleCtrl');
    requirementService.schedule = {
    	'name': 'My Cool Schedule',
    	'major': ['Computer Science'],
    	'semesters': [
    		{
    			'season': 'Fall',
    			'year': 2014,
    			'courses': [
    				{
    					'name': 'CS 61A'
    				},
    				{
    					'name': 'CS 61B'
    				},
    				{
    					'name': 'CS 61C'
    				}
    			]
    		},
    		{
    			'season': 'Spring',
    			'year': 2015,
    			'courses': [
    				{
    					'name': 'CS 61A'
    				},
    				{
    					'name': 'CS 61B'
    				},
    				{
    					'name': 'CS 61C'
    				}
    			]
    		}
    	]
    }
    $scope.requirementService = requirementService;

  });
