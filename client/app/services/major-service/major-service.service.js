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
        //        var stubCourses = [
//            {
//                "name": "CS 61A",
//                "units": 4,
//                "_id": "5461a194665fee02008eb955",
//                "__v": 0
//            },
//            {
//                "name": "CS 61B",
//                "units": 4,
//                "_id": "5461a19b665fee02008eb956",
//                "__v": 0
//            },
//            {
//                "name": "CS 61C",
//                "units": 4,
//                "_id": "5461a19e665fee02008eb957",
//                "__v": 0
//            },
//            {
//                "name": "CS70",
//                "units": 4,
//                "_id": "5461a1b5665fee02008eb958",
//                "__v": 0
//            },
//            {
//                "name": "CS160",
//                "units": 4,
//                "_id": "5461a1bc665fee02008eb959",
//                "__v": 0
//            },
//            {
//                "name": "CS161",
//                "units": 4,
//                "_id": "5461a1c0665fee02008eb95a",
//                "__v": 0
//            },
//            {
//                "name": "CS162",
//                "units": 4,
//                "_id": "5461a1c7665fee02008eb95b",
//                "__v": 0
//            },
//            {
//                "name": "CS164",
//                "units": 4,
//                "_id": "5461a1cb665fee02008eb95c",
//                "__v": 0
//            },
//            {
//                "name": "CS169",
//                "units": 4,
//                "_id": "5461a1cf665fee02008eb95d",
//                "__v": 0
//            },
//            {
//                "name": "CS170",
//                "units": 4,
//                "_id": "5461a1d5665fee02008eb95e",
//                "__v": 0
//            },
//            {
//                "name": "CS172",
//                "units": 4,
//                "_id": "5461a1d8665fee02008eb95f",
//                "__v": 0
//            },
//            {
//                "name": "CS174",
//                "units": 4,
//                "_id": "5461a1db665fee02008eb960",
//                "__v": 0
//            },
//            {
//                "name": "CS184",
//                "units": 4,
//                "_id": "5461a1e1665fee02008eb961",
//                "__v": 0
//            },
//            {
//                "name": "CS186",
//                "units": 4,
//                "_id": "5461a1e6665fee02008eb962",
//                "__v": 0
//            },
//            {
//                "name": "CS188",
//                "units": 4,
//                "_id": "5461a1ea665fee02008eb963",
//                "__v": 0
//            },
//            {
//                "name": "CS189",
//                "units": 4,
//                "_id": "5461a1ef665fee02008eb964",
//                "__v": 0
//            },
//            {
//                "name": "CS195",
//                "units": 4,
//                "_id": "5461a1f5665fee02008eb965",
//                "__v": 0
//            },
//            {
//                "name": "EE20",
//                "units": 4,
//                "_id": "5461a2c8665fee02008eb966",
//                "__v": 0
//            },
//            {
//                "name": "EE40",
//                "units": 4,
//                "_id": "5461a2d0665fee02008eb967",
//                "__v": 0
//            },
//            {
//                "name": "EE105",
//                "units": 4,
//                "_id": "5461a2d6665fee02008eb968",
//                "__v": 0
//            },
//            {
//                "name": "EE120",
//                "units": 4,
//                "_id": "5461a2dc665fee02008eb969",
//                "__v": 0
//            },
//            {
//                "name": "EE125",
//                "units": 4,
//                "_id": "5461a2e2665fee02008eb96a",
//                "__v": 0
//            },
//            {
//                "name": "EE126",
//                "units": 4,
//                "_id": "5461a2e6665fee02008eb96b",
//                "__v": 0
//            },
//            {
//                "name": "EE128",
//                "units": 4,
//                "_id": "5461a2ea665fee02008eb96c",
//                "__v": 0
//            },
//            {
//                "name": "EE140",
//                "units": 4,
//                "_id": "5461a2f0665fee02008eb96d",
//                "__v": 0
//            },
//            {
//                "name": "EE141",
//                "units": 4,
//                "_id": "5461a2f5665fee02008eb96e",
//                "__v": 0
//            },
//            {
//                "name": "EE149",
//                "units": 4,
//                "_id": "5461a2fc665fee02008eb96f",
//                "__v": 0
//            },
//            {
//                "name": "MATH1A",
//                "units": 4,
//                "_id": "5461a572665fee02008eb970",
//                "__v": 0
//            },
//            {
//                "name": "MATH1B",
//                "units": 4,
//                "_id": "5461a577665fee02008eb971",
//                "__v": 0
//            },
//            {
//                "name": "MATH53",
//                "units": 4,
//                "_id": "5461a57c665fee02008eb972",
//                "__v": 0
//            },
//            {
//                "name": "MATH54",
//                "units": 4,
//                "_id": "5461a57f665fee02008eb973",
//                "__v": 0
//            },
//            {
//                "name": "PHYSICS 7A",
//                "units": 4,
//                "_id": "5461a608665fee02008eb974",
//                "__v": 0
//            },
//            {
//                "name": "PHYSICS 7B",
//                "units": 4,
//                "_id": "5461a60c665fee02008eb975",
//                "__v": 0
//            }],
//            stubMajors = [
//                {
//                    "name": "EECS",
//                    "_id": "5461ab37665fee02008eb976"
//                },
//                {
//                    "name": "Computer Science",
//                    "_id": "5461b8e8665fee02008eb986"
//                }
//            ];
//        processCourses(stubCourses);
//        callback(stubCourses);
//        processMajors(stubMajors);
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
        var setOfIds = {};
        for(var i = 0; i<majorCopy.requirements.length; i++){
            setOfIds[majorCopy.requirements[i]._id]=[];
        }
        for(var i = 0; i<majorCopy.requirements.length; i++){
            for(var j = majorCopy.requirements[i].exclusives.length; j>0; j--){
                if(!setOfIds[majorCopy.requirements[i].exclusives[j-1]]){
                    majorCopy.requirements[i].exclusives.splice(j-1,1);
                }
            }
            for(var j=0; j<majorCopy.requirements[i].courses.length; j++){
                majorCopy.requirements[i].courses[j] = majorCopy.requirements[i].courses[j]._id;
            }
        }
        $http.put(url, majorCopy);
    };

    service.addRequirement = function(requirement){
        var url = '/api/majors/' + service.asdf._id;
        delete service.asdf['__v'];

        if(requirement._id) {
            for(var i = 0; i<service.asdf.requirements.length; i++){
                if(service.asdf.requirements[i]._id === requirement._id){
                    service.asdf.requirements[i] = requirement;
                    break;
                }
            }
            for (var i = 0; i < service.asdf.requirements.length; i++) {
                var found = false;
                console.log(requirement.exclusives.length);
                for (var j = 0; j<requirement.exclusives.length; j++){
                    if(service.asdf.requirements[i]._id === requirement.exclusives[j]){
                        found = true;
                        for(var l = 0; l < service.asdf.requirements[i].exclusives.length; l++){
                            if(service.asdf.requirements[i].exclusives[l] == requirement._id){
                                break;
                            }
                        }
                        if(l>=service.asdf.requirements[i].exclusives.length){
                            service.asdf.requirements[i].exclusives.push(requirement._id);
                        }
                    }
                }
                console.log(found);
                if(!found){
                    for(var k=0; k<service.asdf.requirements[i].exclusives.length; k++){
                        if(service.asdf.requirements[i].exclusives[k] == requirement._id){
                            service.asdf.requirements[i].exclusives.splice(k,1);
                            break;
                        }
                    }
                }
            }
        }else{
            service.asdf.requirements.push(requirement);
        }

        var majorCopy =  angular.copy(service.asdf);
        var setOfIds = {};
        for(var i = 0; i<majorCopy.requirements.length; i++){
            setOfIds[majorCopy.requirements[i]._id]=1;
        }

        for(var i = 0; i<majorCopy.requirements.length; i++){
            for(var j = majorCopy.requirements[i].exclusives.length; j>0; j--){
                if(!setOfIds[majorCopy.requirements[i].exclusives[j-1]]){
                    majorCopy.requirements[i].exclusives.splice(j-1,1);
                }
            }
            for(var j=0; j<majorCopy.requirements[i].courses.length; j++){
                majorCopy.requirements[i].courses[j] = majorCopy.requirements[i].courses[j]._id;
            }
        }
        return $http.put(url,majorCopy).success(function(major){
            if(requirement._id) {
                for (var i = 0; i < service.fullAllMajors.length; i++) {
                    if (service.fullAllMajors[i]._id == major._id) {
                        (function (cntr) {
                            var url = '/api/majors/' + major._id;
                            $http.get(url).success(function (major) {
                                service.fullAllMajors[cntr] = major;
                            });
                        })(i);
                    }
                }
            }else{
                var newReq = major.requirements[major.requirements.length-1];
                for(var i = 0; i<majorCopy.requirements.length - 1; i++){
                    for(var j = 0; j<newReq.exclusives.length; j++){
                        if(newReq.exclusives[j]==majorCopy.requirements[i]){
                            majorCopy.requirements[i].exclusives.push(newReq._id);
                        }
                    }
                }
                majorCopy.requirements[majorCopy.requirements.length-1]._id = major.requirements[major.requirements.length-1]._id;
                return $http.put(url,majorCopy).success(function(major){
                    for (var i = 0; i < service.fullAllMajors.length; i++) {
                        if (service.fullAllMajors[i]._id == major._id) {
                            (function (cntr) {
                                var url = '/api/majors/' + major._id;
                                $http.get(url).success(function (major) {
                                    service.fullAllMajors[cntr] = major;
                                });
                            })(i);
                        }
                    }
                });
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
            for(var i = 0; i<service.allMajors.length; i++){
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
