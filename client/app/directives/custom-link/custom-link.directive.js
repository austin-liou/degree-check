'use strict';

angular.module('degreeCheckApp')
  .directive('customLink', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
      	var courseName = attrs.customLink,
      		courseArr = courseName.split(' '),
      		berkeleyTime = 'http://www.berkeleytime.com/catalog/';

        element.attr('href', berkeleyTime + courseArr[0] + '/' + courseArr[1]);
      }
    };
  });