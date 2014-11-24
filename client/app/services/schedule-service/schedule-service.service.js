'use strict';

angular.module('degreeCheckApp')
  .factory('scheduleService', ['$http', function ($http) {
    var service = {};
    service.classesTaking = {};
    service.classesRequired = {};
    service.yearsProcessed = [];
    service.requirementsProcessed = [];
    service.requirementMap = {};
    service.coursesMap = {};
    service.tracker ={};

    service.initSchedule = function (uid) {
      $http.get('/api/users/' + "1")
        .success(function (bigJson) {
          service.schedule = bigJson;
          service.currSchedule = service.schedule.schedules[0];
          service.yearsProcessed = processYears(service.currSchedule);
          setupSchedule(service.schedule.schedules[0]);
        });
    };

    function clearReqs() {
        service.requirementMap = {};
        service.requirementMap = {};
        service.coursesMap = {};
        service.tracker = {};
        service.emptyTracker = {};

        for (var i = 0; i < service.currSchedule.major[0].requirements.length; i++) {
            var requirement = service.currSchedule.major[0].requirements[i];
            service.requirementMap[requirement._id] = {'exclusives': requirement.exclusives, 'quantity': requirement.quantity, 'type': requirement.type};
            service.tracker[requirement._id] = [[]];
            service.emptyTracker[requirement._id] = [];
            for (var j = 0; j < requirement.courses.length; j++) {
                var course = requirement.courses[j];
                console.log(course);
                if (!service.coursesMap[course._id]) {
                    service.coursesMap[course._id] = {'requirement': [], 'units': course.units};
                }
                service.coursesMap[course._id].requirement.push(requirement._id);
            }
        }
    }

    function updateReqs(){
        clearReqs()
        var scheduleObj = service.currSchedule;
        for(var i=0; i< scheduleObj.semesters.length; i++){
            for(var j in  scheduleObj.semesters[i].courses){
                var course = scheduleObj.semesters[i].courses[j];
                if(service.coursesMap[course._id]) {
                    var exclusives = [];
                    var reqTemp = angular.copy(service.coursesMap[course._id].requirement);
                    for (var k in service.coursesMap[course._id].requirement) {
                        var req_id = service.coursesMap[course._id].requirement[k];
                        for (var l in service.requirementMap[req_id].exclusives) {
                            var exclusive = service.requirementMap[req_id].exclusives[l];
                            var exists = false;
                            for(var x in exclusives){
                                if(exclusives[x] == exclusive){
                                    exists = true;
                                    break;
                                }
                            }
                            if(!exists){
                                exclusives.push(exclusive);
                            }
                            for(x = reqTemp.length - 1; x>=0; x--){
                                if(reqTemp[x] == exclusive){
                                    reqTemp.splice(x,1);
                                }
                            }

                        }
                    }
                    for (k in reqTemp) {
                        req_id = reqTemp[k];
                        for (var j = 0; j < service.tracker[req_id].length; j++) {
                            if (service.requirementMap[req_id].type == 'units') {
                                for (var _ = 0; _ < course.units; _++) {
                                    service.tracker[req_id][j].push(course._id);
                                }
                            } else if (service.requirementMap[req_id].type == 'courses') {
                                service.tracker[req_id][j].push(course._id);
                            }
                        }
                    }
                    if (exclusives.length > 0) {
                        var tempTracker = angular.copy(service.emptyTracker);
                        for (k in exclusives) {
                            req_id = exclusives[k];
                            var temp = angular.copy(service.tracker);
                            for (j = 0; j < temp[req_id].length; j++) {
                                if (service.requirementMap[req_id].type == 'units') {
                                    for (_ = 0; _ < course.units; _++) {
                                        temp[req_id][j].push(course._id);
                                    }
                                } else if (service.requirementMap[req_id].type == 'courses') {
                                    temp[req_id][j].push(course._id);


                                }
                            }
                            for (var m in service.currSchedule.major[0].requirements) {
                                var requirement = service.currSchedule.major[0].requirements[m];
                                tempTracker[requirement._id]=tempTracker[requirement._id].concat(temp[requirement._id]);


                            }
                        }
                        service.tracker = angular.copy(tempTracker);

                    }
                }
            }
        }

        checkReqs(scheduleObj);
    }

    function checkReqs(scheduleObj){
        for(i in service.currSchedule.major[0].requirements){
            var requirement = service.currSchedule.major[0].requirements[i];
            var req_id = requirement._id;
            var met = true;
            var started = false;
            for(var j = 0; j<service.tracker[req_id].length; j++){
                if(service.tracker[req_id][j].length < requirement.quantity){
                    met = false;
                }
                if(service.tracker[req_id][j].length > 0){
                    started = true;
                }
            }
            if(met){
                requirement.satisfied = true;
                requirement.ip = false;
                requirement.notStarted = false;
            }else if(started){
                requirement.satisfied = false;
                requirement.ip = true;
                requirement.notStarted = false;
            }else{
                requirement.satisfied = false;
                requirement.ip = false;
                requirement.notStarted = true;
            }
        }

        if(service.currSchedule.major[0].requirements.length == 0){
            return;
        }
        for(var i=0; i<service.tracker[req_id].length; i++){
            var done = true;
            for(j in service.currSchedule.major[0].requirements){
                req_id = service.currSchedule.major[0].requirements[j]._id;
                if(service.tracker[req_id][i].length < requirement.quantity){
                    done = false;
                    break;
                }
            }
            if(done){
                for(j in service.currSchedule.major[0].requirements){
                    requirement = service.currSchedule.major[0].requirements[j];
                    requirement.satisfied = true;
                    requirement.ip = false;
                    requirement.notStarted = false;
                }
                break;
            }
        }
    }

    /*
        Sets up schedule obj for left sidebar by updating all requirements
        Used for initially loading a schedule
        Use updateUserReq for updating a single requirement
    */
    function setupSchedule (scheduleObj) {
        // Clear all reqs first
        updateReqs();

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
                    updateReqs();
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
      var id = 1; // TODO assign IDs corectly
      var semesters = scheduleObj.semesters;
      var startYear = semesters[0].year;
      var endYear = semesters[semesters.length - 1].year;
      return [
        {
          '_id': id,
          'startYear': startYear,
          'endYear': endYear,
          'semesters': semesters
        }
      ];
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
                    updateReqs();
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
            serviceSchedule.schedules[j] = currentSchedule;
        }

        // Put user
        $http.put('/api/users/' + service.schedule.uid, serviceSchedule)
          .success(function() {
            // something in here after putting? don't know yet
          });
    };

    return service;
  }]);
