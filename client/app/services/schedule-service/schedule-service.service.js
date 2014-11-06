'use strict';

angular.module('degreeCheckApp')
  .factory('scheduleService', function () {
    var service = {};
    service.classesTaking = {};
    service.classesRequired = {};

    service.schedule = {
        'name': 'Mari Batilando',
        'uid': '12345',
        'email': 'mari.batilando@gmail.com',
        'prev_coursework': [ { 'name': 'Calculus 1', 'units': 12 } ],
        'schedules': [
            {
                'name': 'My Schedule',
                'major': [
                    { 'name': 'Computer Science',
                      'requirements': [
                        { 'name': 'Pre-requisite',
                          'division': 'Lower Division',
                          'type': 'Class',
                          'quantity': '3',
                          'courses': [
                            { 'name': 'CS 61A',
                              'units': 4
                            },
                            { 'name': 'CS 61B',
                              'units': 4
                            },
                            { 'name': 'CS 61C',
                              'units': 4
                            }
                          ]
                        },
                        { 'name': 'Design Requirement',
                          'division': 'Upper Division',
                          'type': 'Class',
                          'quantity': '2',
                          'courses': [
                            { 'name': 'CS 160',
                              'units': 4
                            }
                          ]
                        }
                      ]
                    }
                ],
                'semesters': [
                    { 'season': 'Fall',
                      'year': 2015,
                      'courses': [
                        { 'name': 'CS 61A',
                          'units': 4
                        },
                        { 'name': 'CS 61B',
                          'units': 4
                        },
                        { 'name': 'CS 61C',
                          'units': 4
                        }
                      ]
                    }
                ]
            }
        ]
    };

    service.semestersProcessed = [
        {
            'startYear': 2011,
            'endYear': 2012,
            'semesters': [
                { 'season': 'Fall',
                  'year': 2011,
                  'courses': [
                    { 'name': 'CS 61A',
                      'units': 4
                    },
                    { 'name': 'CS 61B',
                      'units': 4
                    },
                    { 'name': 'CS 61C',
                      'units': 4
                    }
                  ]
                },
                { 'season': 'Spring',
                  'year': 2012,
                  'courses': [
                    { 'name': 'CS 61A',
                      'units': 4
                    },
                    { 'name': 'CS 61B',
                      'units': 4
                    },
                    { 'name': 'CS 61C',
                      'units': 4
                    }
                  ]
                },
                { 'season': 'Summer',
                  'year': 2012,
                  'courses': [
                    { 'name': 'CS 61A',
                      'units': 4
                    },
                    { 'name': 'CS 61B',
                      'units': 4
                    },
                    { 'name': 'CS 61C',
                      'units': 4
                    }
                  ]
                }
            ]
        }
    ];

    service.currSchedule = service.schedule.schedule[0];

    /*
    	Adds a course to a semester
    	semesterId - semester._id
    	course - { name: String }
    */
    service.addCourse = function (semesterId, course) {
    	var semester;
    	for (var i = 0, len = service.schedule.semesters.length; i < len; i++) {
    		semester = service.schedule.semesters[i];
    		if (semester._id === semesterId) {
                semester.courses.push(course);
                updateSemester();
                // service.updateSemester(semesterId, semester).then(function (updatedSemester) {
                //     semester.courses.push(course);
                // })
    			break;
    		}
    	}
    };

    /*
        Removes a course from a semester
        semesterId - semester._id
        courseId - course._id
    */
    service.removeCourse = function (semesterId, courseId) {
        var semester, course;
        for (var i = 0, len = service.schedule.semesters.length; i < len; i++) {
            semester = service.schedule.semesters[i];
            if (semester._id === semesterId) {
                course = semester.courses;
                for (var j = 0, jLen = course.length; j < jLen; j++) {
                    if (course[j]._id === courseId) {
                        semester.courses.splice(j, 1);
                        resetRequirements();
                        updateSemester();
                        return;
                        // var coursesCopy = semester.courses.slice(),
                        //     newCourses = coursesCopy.splice(j, 1),
                        //     objCopy = angular.copy(semester);
                        // objCopy.courses = newCourses;
                        // service.updateSemester(semesterId, semester).then(function (updatedSemester) {
                        //     semester = updatedSemester;
                        // })
                    }
                }
            }
        }
    };

    service.addSemester = function (season, year) {
        var newSemester = { season: season, year: year, courses: [] };
        service.schedule.semesters.push(newSemester);
    };

    /*
        Updates a semester object, given semester parameter
        Returns a promise
        semesterId - semester._id
        semester - { _id: String, season: String, year: Number, courses: [Course]}
    */
    service.updateSemester = function (semesterId, semester) {
        var deferred = $q.defer();

        $http.put('/api/semester/'+semesterId, semester)
            .success(function (updatedSemester) {
              deferred.resolve(updatedSemester);
            });

        return deferred.promise;
    };

    /*
        Adds a new schedule
        scheduleObj: { name : String,
                       major: [ Major._id ],
                       semesters: [ { season: String,
                                      year: Number,
                                      courses: [] } ]
                      }
    */
    service.addSchedule = function (scheduleObj) {
        $http.put('/api/users/' + service.schedule.uid)
            .success(function () {
                createLocalSchedule(scheduleObj);
            });
    };

    function createLocalSchedule () {
        if (!service.schedule) { return; }

    };

    /*
       Replaces the embedded course and major objects in the
       User object with the corresponding course and major IDs.
       TODO austin-liou
    */
    service.saveSchedule = function () {

    };

    /*
        Makes a hash containing requirement objects
        {
            'Lower Division': {
                'Pre requisite': {
                    'CS 61A': {
                        'satisfied': false
                    }
                }
            }
        }
    */
    // function makeReqArr () {
    //     service.classesRequired = {};
    //     var semesters = service.schedule.semesters,
    //         semClasses = [],
    //         requirements = service.schedule.major[0].requirements;

    //     for (var j = 0; j < requirements.length; j++) {
    //         requirements[j].courses.map(function (elem) {
    //             if (!service.classesRequired.hasOwnProperty([requirements[j].type])) {
    //                 service.classesRequired[requirements[j].type] = {};
    //             }

    //             if (!service.classesRequired[requirements[j].type].hasOwnProperty([requirements[j].name])) {
    //                 service.classesRequired[requirements[j].type][requirements[j].name] = {};
    //             }

    //             service.classesRequired[requirements[j].type][requirements[j].name][elem.name] = { satisfied: false };
    //         });
    //     }
    //     updateSemester();
    // };
    // makeReqArr();

    /*
        Iterates through the users semester and updates requirements hash
    */
    function updateSemester () {
        var semesters = service.schedule.semesters;
        // Go through all semesters
        for (var i = 0, len = semesters.length; i < len; i++) {
            semesters[i].courses.map(function (elem) {
                // Look in hash if it's a requirement
                for (var type in service.classesRequired) {
                    for (var req in service.classesRequired[type]) {
                        if (service.classesRequired[type][req].hasOwnProperty(elem.name)) {
                            service.classesRequired[type][req][elem.name].satisfied = true;
                            return;
                        }
                    }
                }
            });
        }
    };

    /*
        Resets all requirements to unsatisfied
    */
    function resetRequirements () {
        for (var type in service.classesRequired) {
            for (var req in service.classesRequired[type]) {
                for (var course in service.classesRequired[type][req]) {
                    service.classesRequired[type][req][course].satisfied = false;
                }
            }
        }
    };


    return service;
  });
