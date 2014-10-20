'use strict';

angular.module('degreeCheckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        views: {
        	'': {
        		templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
        	},
        	'footer@main': {
        		templateUrl: 'components/footer/footer.html',
        		controller: 'FooterCtrl'
        	}
        }
      });
  });