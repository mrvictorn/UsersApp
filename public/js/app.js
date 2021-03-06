var app=angular.module('usersApp', ['ngRoute', 'ngResource','appRoutes','MainCtrl', 'PersonsCtrl', 'PersonsService','CustomersCtrl', 'CustomersService']);

app.directive('editInPlace', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            update: '=update',
        },
        templateUrl: function(elem, attr){
            var type ='';
            if (attr.type && attr.type =='date') 
                type = 'Date';
            return 'views/editInPlace'+type+'.html';
        },
        link: function ($scope, element, attrs) {
            var inputElement = angular.element(element.children()[1]);
            element.addClass('edit-in-place');

            $scope.editing = false;
        
            $scope.edit = function () {
                $scope.editing = true;
                $scope.lastState=$scope.value;
                element.addClass('active');
                inputElement[0].focus();
            };
            //here need to refactor code:)
            inputElement.prop('onkeyup', function(e) {
                switch (e.keyCode) {
                    case 13: //enter
                        $scope.editing = false;
                        element.removeClass('active');
                        if ($scope.update && $scope.update.$update) {
                            $scope.update.$update();
                            $scope.$parent.updateList();
                        }
                        break;
                    case 27: //esc 
                        $scope.value = $scope.lastState;
                        $scope.editing = false;
                        element.removeClass('active');
                        break;
                };
            });

            inputElement.prop('onblur', function () {
                $scope.editing = false;
                element.removeClass('active');
                if ($scope.update && $scope.update.$update) {
                    $scope.update.$update();
                    $scope.$parent.updateList();
                }
            });
        }
    };
});

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.transformResponse.push(function(responseData){
        convertDateStringsToDates(responseData);
        return responseData;
    });
}]);

var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        // TODO: Improve this regex to better match ISO 8601 date strings.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
            var milliseconds = Date.parse(match[0]);
            if (!isNaN(milliseconds)) {
                input[key] = new Date(milliseconds);
            }
        } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
        }
    }
}

