'use strict';

angular.module('degreeCheckApp')
  .directive('autoComplete', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.autocomplete({
          source: scope[attrs.uiItems],
          delay: 250,
          change: function(event, ui) {
            element.trigger('input');
          }
        });
      }
    }
  });
