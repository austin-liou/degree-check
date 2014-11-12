'use strict';

angular.module('degreeCheckApp')
    .controller('AdminEditRequirementsCtrl', function ($scope, $modalInstance, majorService) {
        $scope.majorService = majorService;
        function allCoursesCallback (courses) {
            $scope.allCourses = courses.map(function (elem) { return elem.name; });
            $scope.allCourseIds = courses.map(function (elem) { return elem._id; });
            $scope.requirement = majorService.req;
        };
        $scope.majorService.initMajorService(allCoursesCallback);
        $scope.newClass = '';
        $scope.courses =[];



        $scope.check = function (event) {
            // Check if enter
            console.log("enter checkinput");
            if (event.keyCode === 13) {
                // Check if valid course
                console.log("Before");
                //console.log($scope.courses);
                console.log($scope.requirement.courses);
                var index = $scope.allCourses.indexOf($scope.newClass);
                if (index > -1) {
                    var course = majorService.allCourses[index];
                    //$scope.courses.push(course);
                    $scope.requirement.courses.push(course);
                    console.log("After");
                    //console.log($scope.courses);
                    console.log($scope.requirement.courses);
                    $scope.newClass = '';
                }
            }
        };
        $scope.rmCourse = function (course) {
            console.log(course);
            var course_id = course._id;
            console.log("Why are you here?");
            for( var i = 0; i<$scope.requirement.courses.length; i++){
                if($scope.requirement.courses[i]._id == course_id){
                    var index = $scope.requirement.courses.map(function (elem) { return elem._id; }).indexOf(course_id);
                    console.log(course_id);
                    console.log($scope.requirement.courses[index]);
                    $scope.requirement.courses.splice(index,1);
                }
            }
        };

        $scope.addRequirement = function(){
            //$scope.requirement['courses']=$scope.courses;
            majorService.addRequirement($scope.requirement);
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });