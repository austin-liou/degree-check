'use strict';

angular.module('degreeCheckApp')
    .controller('AdminAddRequirementsCtrl', function ($scope, $modalInstance, majorService) {
        $scope.majorService = majorService;
        function allCoursesCallback(courses) {
            $scope.allCourses = courses.map(function (elem) {
                return elem.name;
            });
        };
        $scope.majorService.initMajorService(allCoursesCallback);
        $scope.requirement = {name: '', division: 'Lower Division', type: 'units', quantity: 0, courses: []};
        $scope.newClass = '';
        $scope.courses = [];

        $scope.rmCourse = function (course) {
            var course_id = course._id;
            console.log("Why are you here?");
            for (var i = 0; i < $scope.requirement.courses.length; i++) {
                if ($scope.requirement.courses[i]._id == course_id) {
                    var index = $scope.requirement.courses.map(function (elem) {
                        return elem._id;
                    }).indexOf(course_id);
                    $scope.requirement.courses.splice(index, 1);
                }
            }
        };

        $scope.check = function (event) {
            // Check if enter
            console.log("enter checkinput");
            if (event.keyCode === 13) {
                // Check if valid course
                console.log($scope.requirement.courses);
                var index = $scope.allCourses.indexOf($scope.newClass);
                if (index > -1) {
                    var course = majorService.allCourses[index];
                    $scope.requirement.courses.push(course);
                    $scope.newClass = '';
                }
            }
        };


        $scope.addRequirement = function () {
            //$scope.requirement['courses']=$scope.courses;
            majorService.addRequirement($scope.requirement);
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });