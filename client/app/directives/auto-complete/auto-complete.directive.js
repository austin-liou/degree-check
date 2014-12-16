'use strict';

angular.module('degreeCheckApp')
  .directive('autoComplete', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.autocomplete({
          source: function(request, response) {
            var re = $.ui.autocomplete.escapeRegex(request.term);
            var matcher = new RegExp( "^" + re, "i" );
            var a = $.grep(scope[attrs.uiItems], function(item, index){
              return matcher.test(item);
            });
            response(a);
          },
          autoFocus: true,
          delay: 250,
          change: function(event, ui) {
            element.trigger('input');
          }
        });
      }
    }
  });
