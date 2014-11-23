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
        	},
          'header@admin': {
            templateUrl: 'components/header/header.html',
            controller: 'HeaderCtrl'
          },
          'footer@admin': {
            templateUrl: 'components/footer/footer.html',
            controller: 'FooterCtrl'
          },
          'content@admin': {
            templateUrl: 'app/admin/templates/admin.search.html',
            controller: 'AdminSearchStudentsCtrl'
          }
        }
      })
      .state('admin.view', {
        url: '/view/:uid',
        controller: 'AdminViewStudentsCtrl',
        templateUrl: 'app/admin/templates/admin.view.html',
        views: {
          'content@admin': {
            templateUrl: 'app/admin/templates/admin.view.html',
            controller: 'AdminViewStudentsCtrl'
          },
          'schedule@admin.view': {
            templateUrl: 'app/admin/templates/admin.view.schedule.html',
            controller: 'AdminViewStudentsCtrl'
          },
          'requirements@admin.view': {
            templateUrl: 'app/admin/templates/admin.view.requirements.html',
            controller: 'AdminViewStudentsCtrl'
          }
        }
      });
  });