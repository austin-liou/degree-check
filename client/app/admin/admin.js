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
      })
      .state('admin.search', {
        url: '/search',
        controller: 'AdminSearchStudentsCtrl',
        views: {
          'content@admin': {
            templateUrl: 'app/admin/templates/admin.search.html'
          }
        }
      })
      .state('admin.view', {
        url: '/view',
        controller: 'AdminViewStudentsCtrl',
        views: {
          'content@admin': {
            templateUrl: 'app/admin/templates/admin.view.html',
            controller: 'AdminViewStudentsCtrl'
          }
        }
      });
  });