'use strict';

angular.module('degreeCheckApp')
  .directive('autoComplete', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
	            element.autocomplete({
                	source: scope[attrs.uiItems],
	                select: function() {
	                    // element.trigger('input');
	                    $timeout(function() {
	                      element.trigger('input');
	                    }, 0);
	                }
           		});
            }
      }
  });