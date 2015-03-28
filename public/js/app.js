var app=angular.module('usersApp', ['ngRoute', 'ngResource','appRoutes','MainCtrl', 'PersonCtrl', 'PersonService']);

app.directive('editInPlace', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            update: '=update'
        },
        template: '<span ng-click="edit()" ng-bind="value"></span><input ng-model="value"></input>',
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

app.directive("clickToEdit", function() {
    var editorTemplate = '<div class="click-to-edit">' +
        '<div ng-click="enableEditor()" ng-hide="view.editorEnabled">' +
            '{{value}} ' +
        '</div>' +
        '<div ng-show="view.editorEnabled">' +
            '<input ng-model="view.editableValue">' +
            '<a href="#" ng-click="save()">Save</a>' +
            ' or ' +
            '<a ng-click="disableEditor()">cancel</a>.' +
        '</div>' +
    '</div>';

    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToEdit",
        },
        controller: function($scope) {
            $scope.view = {
                editableValue: $scope.value,
                editorEnabled: false
            };

            $scope.enableEditor = function() {
                $scope.view.editorEnabled = true;
                $scope.view.editableValue = $scope.value;
            };

            $scope.disableEditor = function() {
                $scope.view.editorEnabled = false;
            };

            $scope.save = function() {
                $scope.value = $scope.view.editableValue;
                $scope.disableEditor();
            };
        }
    };
});

