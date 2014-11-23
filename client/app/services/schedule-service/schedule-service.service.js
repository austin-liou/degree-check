'use strict';

angular.module('degreeCheckApp')
  .factory('scheduleService', ['$http', function ($http) {
    var service = {};
    service.classesTaking = {};
    service.classesRequired = {};
    service.yearsProcessed = [];
    service.requirementsProcessed = [];

    service.initSchedule = function (uid) {
      $http.get('/api/users/' + uid)
        .success(function (bigJson) {
          service.schedule = bigJson;
          service.currSchedule = service.schedule.schedules[0];
          service.yearsProcessed = processYears(service.currSchedule);
          setupSchedule(service.schedule.schedules[0]);
        });
    };

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
    	course - { __v: 0
                _id: "5461a572665fee02008eb970"
                name: "MATH1A"
                units: 4 }
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
      /**var requirement;
      for (var i = 0, len = service.currSchedule.major[0].requirements.length; i < len; i++) {
           requirement = service.currSchedule.major[0].requirements[i];
           for (var j = 0, jLen = requirement.courses.length; j < jLen; j++) {
              requirement.courses[j].satisfied = false;
           }
      }**/
    };

    /*
      Process requirements to display properly on left side bar
      TODO
    */
    function processRequirements (requirementsArr) {
      service.requirementsProcessed = [];

      for (var i = 0, len = requirementsArr.length; i < len; i++) {

      }
    }

    /*
      Turns schedule obj into an object similar to service.processedYears
      aliou - assuming semesters are in correct order (first to last)
    */
    function processYears (scheduleObj) {
      var years = [];
      for(var i=0; i < scheduleObj.semesters.length; i+=3) {
        var id = scheduleObj.semesters[i]._id;
        var startYear = scheduleObj.semesters[i].year;
        var endYear = scheduleObj.semesters[i+1].year;
        var semesters = [scheduleObj.semesters[i],scheduleObj.semesters[i+1],scheduleObj.semesters[i+2]];
        years.push({
          '_id': id,
          'startYear': startYear,
          'endYear': endYear,
          'semesters': semesters
        });
      }
      service.yearsProcessed = years;
      return years;
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

    service.addYear = function (year) {
        var fallSemester = { season: "Fall", year: year.endYear, courses: [] };
        var springSemester = { season: "Spring", year: (parseInt(year.endYear)+1).toString(), courses: [] };
        var summerSemester = { season: "Summer", year: (parseInt(year.endYear)+1).toString(), courses: [] };

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
                if (currentSchedule.major[k] !== null)
                      currentSchedule.major[k] = currentSchedule.major[k]._id;
            }
            for (var l = 0; l < currentSchedule.semesters.length; l++) {
                var currentSemester = currentSchedule.semesters[l];
                for (var m = 0; m < currentSemester.courses.length; m++) {
                    currentSemester.courses[m] = currentSemester.courses[m]._id;
                }
                currentSchedule.semesters[l] = currentSemester;
            }
            serviceSchedule.schedules[j] = currentSchedule;
        }

        service.currSchedule.semesters.push(fallSemester);
        service.currSchedule.semesters.push(springSemester);
        service.currSchedule.semesters.push(summerSemester);
        processYears(service.currSchedule);
        delete service.schedule['__v'];

        $http.put('/api/users/' + service.schedule.uid, serviceSchedule)
          .success(function(data) {
          });
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
          service.yearsProcessed = processYears(service.currSchedule);
          setupSchedule(service.currSchedule);
          return;
        }
      }
    };

    /*
        Adds a new schedule
    */
    service.addSchedule = function (schedule, callback) {
        $http.get('/api/majors/' + schedule.major)
            .success(function (majorObj) {
                var newSchedule = {};
                newSchedule.name = schedule.name;
                newSchedule.semesters = createSemesters();
                newSchedule.major = [majorObj];
                service.schedule.schedules.push(newSchedule);
                service.saveSchedule()
                callback();
            });
    };

    function createSemesters () {
        return [
                 {
                      "season": "Fall",
                      "year": "2014",
                      "courses": []
                  },
                  {
                      "season": "Spring",
                      "year": "2015",
                      "courses": []
                  },
                  {
                      "season": "Summer",
                      "year": "2015",
                      "courses": []
                  }
                ];
    }
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
                if (currentSchedule.major[k] !== null)
                      currentSchedule.major[k] = currentSchedule.major[k]._id;
            }
            for (var l = 0; l < currentSchedule.semesters.length; l++) {
                var currentSemester = currentSchedule.semesters[l];
                for (var m = 0; m < currentSemester.courses.length; m++) {
                    currentSemester.courses[m] = currentSemester.courses[m]._id;
                }
                currentSchedule.semesters[l] = currentSemester;
            }
            serviceSchedule.schedules[j] = currentSchedule;
        }

        delete service.schedule['__v'];

        // Put user
        $http.put('/api/users/' + service.schedule.uid, serviceSchedule)
          .success(function(data) {
            service.schedule.schedules = data.schedules;
          });
    };

    return service;
  }]);
