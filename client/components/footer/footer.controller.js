'use strict';

angular.module('degreeCheckApp')
  .controller('FooterCtrl', function ($scope, $modal, $location) {
  	
  	$scope.about = function () {
        var modalInstance = $modal.open({
            templateUrl: 'about.html',
            size: 'md'
        });
    };

    $scope.contact = function () {
        var modalInstance = $modal.open({
            templateUrl: 'contact.html',
            size: 'md'
        });
    };

    $scope.team = function () {
        var modalInstance = $modal.open({
            templateUrl: 'team.html',
            size: 'md'
        });
    };
  });