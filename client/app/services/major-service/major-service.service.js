'use strict';

angular.module('degreeCheckApp')
  .factory('majorService', function ($http) {
    var service = {};
        service.allCourses = [],
        service.allCoursesHash = {},
        service.allMajors = [];
        service.fullAllMajors = [];
        service.asdf;
        service.requirement;
        service.course;

    service.initMajorService = function (callback) {
        $http.get('/api/courses/')
            .success(function (courses) {
              processCourses(courses);
              callback(courses);
            });
        $http.get('/api/majors/')
            .success(function (majors) {
              processMajors(majors);
            });
    };


    // service.getAllClasses = (function () {
    // 	return $http.get('/api/courses/')
    //     .success(function (allCourses) {
    //       service.allCourses = allCourses;
    //     })
    // })();
    service.fullGetMajor = function(){
        $http.get('/api/majors/')
            .success(function (majors) {
                service.fullAllMajors = [];
                for (var i = 0; i < service.allMajors.length; i++) {
                    (function (cntr) {
                        var major_id = service.allMajors[cntr]._id;
                        var url = '/api/majors/' + major_id;
                        $http.get(url).success(function (major) {
                            console.log(major);
                            service.fullAllMajors.push(major);
                        });
                    })(i);
                }
            });
    };
    service.deleteRequirement = function(major, req_id){
        for( var i = 0; i<major.requirements.length; i++){
            if(major.requirements[i]._id == req_id){
                major.requirements.splice(i,1);
                var url = '/api/majors/' + major._id;
                delete major['__v'];
                break;
            }
        }
        var majorCopy =  angular.copy(major);
        for(var i = 0; i<majorCopy.requirements.length; i++){
            for(var j=0; j<majorCopy.requirements[i].courses.length; j++){
                majorCopy.requirements[i].courses[j] = majorCopy.requirements[i].courses[j]._id;
            }
        }
        $http.put(url, majorCopy);
    };
    service.addRequirement = function(requirement){
        var url = '/api/majors/' + service.asdf._id;
        delete service.asdf['__v'];

        for(var i = 0; i<service.asdf.requirements.length; i++){
            if(service.asdf.requirements[i]._id === requirement._id){
                service.asdf.requirements[i] = requirement;
                break;
            }
        }
        if(i>=service.asdf.requirements.length) {
            service.asdf.requirements.push(requirement);
        }
        var majorCopy =  angular.copy(service.asdf);
        for(var i = 0; i<majorCopy.requirements.length; i++){
            for(var j=0; j<majorCopy.requirements[i].courses.length; j++){
                majorCopy.requirements[i].courses[j] = majorCopy.requirements[i].courses[j]._id;
            }
        }
        console.log(service.asdf);
        return $http.put(url,majorCopy).success(function(major){
            for(var i = 0; i< service.fullAllMajors.length; i++){
                if(service.fullAllMajors[i]._id == major._id) {
                    (function (cntr) {
                        var url = '/api/majors/' + major._id;
                        $http.get(url).success(function (major) {
                            service.fullAllMajors[cntr] = major;
                        });
                    })(i);
                }
            }
        });
    };

    service.createMajor = function(major){
        $http.post('api/majors', major).success(function(response){
            service.fullAllMajors.push(response);
            service.allMajors.push({"name": response.name, "_id": response._id});
        });
    }

    service.deleteMajor = function(major) {
        $http.delete('api/majors/' + major._id).success(function(){
            for(var i = 0; i<service.fullAllMajors.length; i++){
                if(service.fullAllMajors[i]._id == major._id){
                    service.fullAllMajors.splice(i,1);
                }
            }
            for(var i = 0; i<service.AllMajors.length; i++){
                if(service.AllMajors[i]._id == major._id){
                    service.AllMajors.splice(i,1);
                }
            }
        })
    };


    service.addCourse = function(course){
        console.log(course);
        $http.post('/api/courses/', course).success(function(){
            $http.get('/api/courses/')
                .success(function (courses) {
                    processCourses(courses);
                });
        });
    };

    service.editCourse = function(course){
        var url = '/api/courses/' + course._id;
        $http.put(url, course).success(function(){
            $http.get('/api/courses/')
                .success(function (courses) {
                    processCourses(courses);
                });
        });
    };

    function processCourses (courses) {
        service.allCourses = courses;
        courses.map(function (course) {
            service.allCoursesHash[course.name] = course.units;
        })
    }

    function processMajors (majors) {
        service.allMajors = majors;
    }

    return service;
  });
