'use strict';

angular.module('degreeCheckApp')
    .controller('AdminAddCourseCtrl', function ($scope, $modalInstance, majorService) {
        $scope.majorService = majorService;
        function allCoursesCallback (courses) {
            $scope.allCourses = courses.map(function (elem) { return elem.name; });
        };
        $scope.majorService.initMajorService(allCoursesCallback);
        $scope.course = {name: '', units: 0};

        $scope.addCourse = function(){
            console.log("hi", $scope.course);
            majorService.addCourse($scope.course);
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });