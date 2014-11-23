'use strict';

angular.module('degreeCheckApp')
    .controller('AdminCoursesCtrl', function ($scope, majorService, $modal) {
        $scope.majorService = majorService;
        function allCoursesCallback (courses) {
            $scope.allCourses = courses.map(function (elem) { return elem.name; });
        };
        $scope.majorService.initMajorService(allCoursesCallback);

        $scope.addCourse = function(){
            var modalInstance = $modal.open({
                templateUrl: 'administrator.major.edit-course.html',
                controller: 'AdminAddCourseCtrl',
                size: 'sm'
            });
        };

        $scope.editCourse = function(course){
            $scope.majorService.course = angular.copy(course);
            var modalInstance = $modal.open({
                templateUrl: 'administrator.major.edit-course.html',
                controller: 'AdminEditCourseCtrl',
                size: 'sm'
            });
        }
    });