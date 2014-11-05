'use strict';

angular.module('degreeCheckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/templates/admin.html',
        controller: 'AdminCtrl',
        views: {
        	'': {
        		templateUrl: 'app/admin/templates/admin.html',
                controller: 'AdminCtrl'
          }
        }
      });
  });