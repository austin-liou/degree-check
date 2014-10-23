'use strict';

angular.module('degreeCheckApp')
  .factory('scheduleService', function () {
    var service = {};

    service.schedule = {
    	'name': 'My Cool Schedule',
    	'major':[
                    {
                        'name': 'Computer Science',
                        '_id': '1',
                        'requirements': [
                            { 'type': 'Lower Division',
                              'name': 'Pre-requisite',
                              'courses': [
                                {
                                    'name': 'CS 61A',
                                    'satisfied': false
                                }
                              ]
                            }
                        ]
                    }
                 ],
    	'semesters': [
    		{
    			'season': 'Fall',
    			'year': 2014,
    			'_id': '1',
    			'courses': [
    				{
                        '_id': '0',
    					'name': 'CS 61A'
    				},
    				{
                        '_id': '1',
    					'name': 'CS 61B'
    				},
    				{
                        '_id': '2',
    					'name': 'CS 61C'
    				}
    			]
    		},
    		{
    			'season': 'Spring',
    			'year': 2015,
    			'_id': '2',
    			'courses': [
    				{
                        '_id': '0',
    					'name': 'CS 61A'
    				},
    				{
                        '_id': '1',
    					'name': 'CS 61B'
    				},
    				{
                        '_id': '2',
    					'name': 'CS 61C'
    				}
    			]
    		}
    	]
    };

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
                        break;
                        // var coursesCopy = semester.courses.slice(),
                        //     newCourses = coursesCopy.splice(j, 1),
                        //     objCopy = angular.copy(semester);
                        // objCopy.courses = newCourses;
                        // service.updateSemester(semesterId, semester).then(function (updatedSemester) {
                        //     semester = updatedSemester;
                        // })
                    }
                }
                break;
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

    return service;
  });
