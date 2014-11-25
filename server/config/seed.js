/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Course = require('../api/course/course.model'),
    Major = require('../api/major/major.model'),
    User = require('../api/user/user.model');

Course.find({}).remove(function() {
    Course.create({
        _id: '5473df006a81515216e5b61c',
        name: 'COMPSCI 10',
        units: 4
    }, {
        _id: '5473df006a81515216e5b61d',
        name: 'COMPSCI 61A',
        units: 4
    }, {
        _id: '5473df006a81515216e5b61e',
        name: 'COMPSCI 61B',
        units: 4
    }, {
        _id: '5473df006a81515216e5b61f',
        name: 'COMPSCI 61C',
        units: 4
    }, {
        _id: '5473df006a81515216e5b621',
        name: 'COMPSCI 70',
        units: 4
    }, {
        _id: '5473df006a81515216e5b622',
        name: 'COMPSCI 150',
        units: 5
    }, {
        _id: '5473df006a81515216e5b623',
        name: 'COMPSCI 152',
        units: 4
    }, {
        _id: '5473df006a81515216e5b624',
        name: 'COMPSCI 160',
        units: 4
    }, {
        _id: '5473df006a81515216e5b625',
        name: 'COMPSCI 161',
        units: 4
    }, {
        _id: '5473df006a81515216e5b626',
        name: 'COMPSCI 162',
        units: 4
    }, {
        _id: '5473df006a81515216e5b627',
        name: 'COMPSCI 168',
        units: 4
    }, {
        _id: '5473df006a81515216e5b628',
        name: 'COMPSCI 169',
        units: 4
    }, {
        _id: '5473df006a81515216e5b629',
        name: 'COMPSCI 170',
        units: 4
    }, {
        _id: '5473df006a81515216e5b62a',
        name: 'COMPSCI 184',
        units: 4
    }, {
        _id: '5473df006a81515216e5b62b',
        name: 'COMPSCI 186',
        units: 4
    }, {
        _id: '5473df006a81515216e5b62c',
        name: 'COMPSCI 188',
        units: 4
    }, {
        _id: '5473df006a81515216e5b62d',
        name: 'COMPSCI 189',
        units: 4
    }, {
        _id: '5473df006a81515216e5b62e',
        name: 'EL ENG 16A',
        units: 4
    }, {
        _id: '5473df006a81515216e5b62f',
        name: 'EL ENG 16B',
        units: 4
    }, {
        _id: '5473df006a81515216e5b631',
        name: 'EL ENG 20',
        units: 4
    }, {
        _id: '5473df006a81515216e5b632',
        name: 'EL ENG 40',
        units: 4
    }, {
        _id: '5473df006a81515216e5b633',
        name: 'EL ENG 105',
        units: 4
    }, {
        _id: '5473df006a81515216e5b634',
        name: 'EL ENG 117',
        units: 4
    }, {
        _id: '5473df006a81515216e5b635',
        name: 'EL ENG 118',
        units: 4
    }, {
        _id: '5473df006a81515216e5b636',
        name: 'EL ENG 120',
        units: 4
    }, {
        _id: '5473df006a81515216e5b637',
        name: 'EL ENG 122',
        units: 4
    }, {
        _id: '5473df006a81515216e5b638',
        name: 'MATH 1A',
        units: 4
    }, {
        _id: '5473df006a81515216e5b639',
        name: 'MATH 1B',
        units: 4
    }, {
        _id: '5473df006a81515216e5b63a',
        name: 'MATH 53',
        units: 4
    }, {
        _id: '5473df006a81515216e5b63b',
        name: 'MATH 54',
        units: 4
    }, {
        _id: '5473df006a81515216e5b63c',
        name: 'PHYSICS 7A',
        units: 4
    }, {
        _id: '5473df006a81515216e5b63d',
        name: 'PHYSICS 7B',
        units: 4
    });
});


Major.find({}).remove(function() {
    Major.create({
        _id: '5473e01984c2ac721685177b',
        name: 'Electrical Engineering & Computer Science',
        requirements: [{
            name: 'CS 61A',
            type: 'courses',
            quantity: 1,
            division: 'Lower Division',
            courses: ['5473df006a81515216e5b61d']
        }, {
            name: 'CS 61B',
            type: 'courses',
            quantity: 1,
            division: 'Lower Division',
            courses: ['5473df006a81515216e5b61e']
        }, {
            name: 'CS 61C',
            type: 'courses',
            quantity: 1,
            division: 'Lower Division',
            courses: ['5473df006a81515216e5b61f']
        }, {
            name: 'Upper-Division EECS Courses',
            type: 'units',
            quantity: 20,
            division: 'Upper Division',
            courses: ['5473df006a81515216e5b622', '5473df006a81515216e5b623', '5473df006a81515216e5b624', '5473df006a81515216e5b625', '5473df006a81515216e5b626', '5473df006a81515216e5b627', '5473df006a81515216e5b628', '5473df006a81515216e5b629', '5473df006a81515216e5b62a', '5473df006a81515216e5b62b', '5473df006a81515216e5b62c', '5473df006a81515216e5b62d', '5473df006a81515216e5b633', '5473df006a81515216e5b634', '5473df006a81515216e5b635', '5473df006a81515216e5b636', '5473df006a81515216e5b637']
        }]
    }, {
        _id: '5473e01984c2ac721685177c',
        name: 'Computer Science',
        requirements: [{
            name: 'CS 61A',
            type: 'courses',
            quantity: 1,
            division: 'Lower Division',
            courses: ['5473df006a81515216e5b61d']
        }, {
            name: 'CS 61B',
            type: 'courses',
            quantity: 1,
            division: 'Lower Division',
            courses: ['5473df006a81515216e5b61e']
        }, {
            name: 'CS 61C',
            type: 'courses',
            quantity: 1,
            division: 'Lower Division',
            courses: ['5473df006a81515216e5b61f']
        }]
    });
});

User.find({}).remove(function() {
    User.create({
        uid: '123456',
        name: 'Test User',
        email: 'test@berkeley.edu',
        schedules: [{
            name: 'Test Schedule',
            comments: 'This is a good schedule',
            blessed: true,
            major: ['5473e01984c2ac721685177b'],
            semesters: [{
                season: 'Fall',
                year: '2014',
                courses: ['5473df006a81515216e5b61d', '5473df006a81515216e5b638']
            }, {
                season: 'Spring',
                year: '2015',
                courses: ['5473df006a81515216e5b61e', '5473df006a81515216e5b639']
            }]
        }]
    });
});
