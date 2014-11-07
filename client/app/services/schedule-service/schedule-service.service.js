'use strict';

angular.module('degreeCheckApp')
  .factory('scheduleService', function () {
    var service = {};
    service.classesTaking = {};
    service.classesRequired = {};

    var initSchedule = (function () {
        // $http.get('/api/users/'+id)
        //     .success(function (bigJson) {
        //         service.schedule = bigJson;
        //         service.currSchedule = service.schedule.schedules[0];
        //         service.yearsProcessed = processYears(service.currSchedule);
        //         setupSchedule(service.schedule.schedules[0]);
        //     });
        service.schedule = {
            'name': 'Mari Batilando',
            'uid': '12345',
            'email': 'mari.batilando@gmail.com',
            'prev_coursework': [ { 'name': 'Calculus 1', 'units': 12 } ],
            'schedules': [
                {   '_id': 1,
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
                        { '_id': '1',
                          'season': 'Fall',
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
                },
                {   '_id': 2,
                    'name': 'My Schedule 2',
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
                        { '_id': '1',
                          'season': 'Fall',
                          'year': 2015,
                          'courses': [
                            { 'name': 'EE 42',
                              'units': 4
                            },
                            { 'name': 'CS 70',
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

        // Process years
        service.yearsProcessed = [
            {
                'startYear': 2011,
                'endYear': 2012,
                'semesters': [
                    { '_id': '1',
                      'season': 'Fall',
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
                    { '_id': '2',
                      'season': 'Spring',
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
                    { '_id': '3',
                      'season': 'Summer',
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

        service.yearsProcessed2 = [
            {
                'startYear': 2014,
                'endYear': 2015,
                'semesters': [
                    { '_id': '1',
                      'season': 'Spring',
                      'year': 2015,
                      'courses': [
                        { 'name': 'EE 42',
                          'units': 4
                        },
                        { 'name': 'CS 70',
                          'units': 4
                        },
                        { 'name': 'CS 61C',
                          'units': 4
                        }
                      ]
                    },
                    { '_id': '2',
                      'season': 'Spring',
                      'year': 2012,
                      'courses': [
                      ]
                    },
                    { '_id': '3',
                      'season': 'Summer',
                      'year': 2012,
                      'courses': [
                      ]
                    }
                ]
            }
        ];

        service.currSchedule = service.schedule.schedules[0];
        setupSchedule(service.schedule.schedules[0]);
    })();

    /*
        Sets up schedule obj for left sidebar by updating all requirements
        Used for initially loading a schedule
        Use updateUserReq for updating a single requirement
    */
    function setupSchedule (scheduleObj) {
        // Clear all reqs first
        clearUserReq();

        for (var i = 0, len = scheduleObj.semesters.length; i < len; i++) {
            for (var j = 0, jLen = scheduleObj.semesters[i].courses.length; j < jLen; j++) {
                updateUserReq(scheduleObj.semesters[i].courses[j].name, true);
            }
        }
    };

    /*
    	Adds a course to a semester
    	semesterId - semester._id
    	course - { name: String, units: Number }
    */
    service.addCourse = function (semesterId, course) {
    	var semester, year;
    	for (var i = 0, len = service.yearsProcessed.length; i < len; i++) {
    		year = service.yearsProcessed[i];
            for(var j = 0, jLen = year.semesters.length; j < jLen; j++) {
                semester = year.semesters[j];
                if (semester._id === semesterId) {
                    semester.courses.push(course);
                    updateUserReq(course.name, true);
                    return;
                }
            }
    	}
    };

    /*
        Sets satisfied attribute to a boolean course in service.currSchedule.major[0].requirements[i].courses
        Used for left sidebar to change color
        courseName: String
        satisfied: boolean
    */
    function updateUserReq (courseName, satisfied) {
        var requirement;
        for (var i = 0, len = service.currSchedule.major[0].requirements.length; i < len; i++) {
             requirement = service.currSchedule.major[0].requirements[i];
             for (var j = 0, jLen = requirement.courses.length; j < jLen; j++) {
                if (requirement.courses[j].name === courseName) {
                    requirement.courses[j].satisfied = satisfied;
                    return;
                }
             }
        }
    };

    /*
      Sets all requirements to unsatisfied
    */
    function clearUserReq () {
      var requirement;
      for (var i = 0, len = service.currSchedule.major[0].requirements.length; i < len; i++) {
           requirement = service.currSchedule.major[0].requirements[i];
           for (var j = 0, jLen = requirement.courses.length; j < jLen; j++) {
              requirement.courses[j].satisfied = false;
           }
      }
    };

    /*
      Turns schedule obj into an object similar to service.processedYears
    */
    function processYears (scheduleObj) {
      // TODO logic

      return [
            {   '_id': 1,
                'startYear': 2011,
                'endYear': 2012,
                'semesters': [
                    { '_id': '1',
                      'season': 'Fall',
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
                    { '_id': '2',
                      'season': 'Spring',
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
                    { '_id': '3',
                      'season': 'Summer',
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
        ]
    };

    /*
        Removes a course from a semester
        semesterId - semester._id
        courseName - String
    */
    service.removeCourse = function (semesterId, courseName) {
        var semester, year;
        for (var i = 0, len = service.yearsProcessed.length; i < len; i++) {
            year = service.yearsProcessed[i];
            for(var j = 0, jLen = year.semesters.length; j < jLen; j++) {
                semester = year.semesters[j];
                if (semester._id === semesterId) {
                    var index = semester.courses.map(function (elem) { return elem.name; }).indexOf(courseName);
                    semester.courses.splice(index, 1);
                    updateUserReq(courseName, false);
                    return;
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
      Clears yearProcessed and deletes a schedule with scheduleId
    */
    service.deleteSchedule = function (scheduleId) {
      var schedule;
      for (var i = 0, len = service.schedule.schedules.length; i < len; i++) {
        schedule = service.schedule.schedules[i];
        if (schedule._id === scheduleId) {
          service.schedule.schedules.splice(i, 1);
          service.yearsProcessed = [];
          service.currSchedule = service.schedule.schedules[0];
          service.yearsProcessed = processYears(service.currSchedule);
          setupSchedule(service.currSchedule);
          return;
        }
      }
    };

    service.changeSchedule = function (scheduleId) {
      // TODO: Process years function
      for (var i = 0, len = service.schedule.schedules.length; i < len; i++) {
        if (service.schedule.schedules[i]._id === scheduleId) {
          service.currSchedule = service.schedule.schedules[i];
          service.yearsProcessed = service.yearsProcessed2;
          // TODO: Process year logic
          // service.yearsProcessed = processYears(service.currSchedule);
          setupSchedule(service.currSchedule);
          return;
        }
      }
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

    /*
        Adds newly added/removed courses from years processed to the original service.schedule object
    */
    function unprocessYears () {
        service.currSchedule.semesters = [];
        var year;
        for (var i = 0, len = service.yearsProcessed.length; i < len; i++) {
            year = service.yearsProcessed[i];
            service.currSchedule.semesters = service.currSchedule.semesters.concat(year.semesters);
        }
    }

    /*
       Replaces the embedded course and major objects in the
       User object with the corresponding course and major IDs.
       Puts new User object.
    */
    service.saveSchedule = function () {
        unprocessYears();
        var serviceSchedule = jQuery.extend(true, {}, service.schedule); // deep copy of service.schedule
        /*
            Replaces all course and major objects in the User object with the object IDs.
            This is in the deep copy, not the original
        */
        for (var i = 0; i < serviceSchedule.prev_coursework.length; i++) {
            serviceSchedule.prev_coursework[i] = serviceSchedule.prev_coursework[i]._id;
        }
        for (var j = 0; j < serviceSchedule.schedules.length; j++) {
            var currentSchedule = serviceSchedule.schedules[j];
            for (var k = 0; k < currentSchedule.major.length; k++) {
                currentSchedule.major[k] = currentSchedule.major[k]._id;
            }
            for (var l = 0; l < currentSchedule.semesters.length; l++) {
                var currentSemester = currentSchedule.semesters[l];
                for (var m = 0; m < currentSemester.courses.length; m++) {
                    currentSemester.courses[m] = currentSemester.courses[m]._id;
                }
                currentSchedule.semesters[l] = currentSemester;
            }
            serviceSchedule.semesters[j] = currentSchedule;
        }

        // Put user
        $http.put('/api/users/' + service.schedule.uid, serviceSchedule)
          .success(function() {
            // something in here after putting? don't know yet
          });
    };

    return service;
  });
