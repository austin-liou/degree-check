'use strict';

angular.module('degreeCheckApp')
    .controller('AdminCreateMajorCtrl', function ($scope, $modalInstance, majorService) {
        $scope.majorService = majorService;
        function allCoursesCallback (courses) {
            $scope.allCourses = courses.map(function (elem) { return elem.name; });
        };
        $scope.majorService.initMajorService(allCoursesCallback);
        $scope.major = {name: ''};

        $scope.addMajor = function(){
            majorService.createMajor($scope.major);
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });