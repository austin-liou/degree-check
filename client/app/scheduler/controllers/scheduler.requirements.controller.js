'use strict';

angular.module('degreeCheckApp')
  .controller('SchedulerRequirementsCtrl', function ($scope, majorService, scheduleService) {
    console.log('SchedulerRequirementsCtrl');

    majorService.major = 'Computer Science';
    $scope.majorService = majorService;

    $scope.requirements = [
	    { type: 'Lower Division',
	      requirements: [
	      	{	'name': 'Pre-requisite',
	      		'courses': [
	      			{
	      				'name': 'CS 61A',
	      				'satisfied': false
	      			}
	      		]
	      	}
	      ]
		},
		{ type: 'Upper Division',
	      requirements: [
	      	{	'name': 'Design Course',
	      		'courses': [
	      			{
	      				'name': 'CS 169',
	      				'satisfied': true
	      			}
	      		]
	      	}
	      ]
		}
    ];

    /*
    	Outputs an array of objects:
    	[ {
			course : String,
			satisfied: Boolean
    	  }
    	]

    	Using majorService and requirementService
    */

    function makeReqArr () {

    }

  });
