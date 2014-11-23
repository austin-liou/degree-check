'use strict';

angular.module('degreeCheckApp')
    .controller('AdminEditCourseCtrl', function ($scope, $modalInstance, majorService) {
        $scope.majorService = majorService;
        function allCoursesCallback (courses) {
            $scope.allCourses = courses.map(function (elem) { return elem.name; });
        };
        $scope.majorService.initMajorService(allCoursesCallback);
        $scope.course = majorService.course;

        $scope.addCourse = function(){
            //$scope.requirement['courses']=$scope.courses;
            majorService.editCourse($scope.course);
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });