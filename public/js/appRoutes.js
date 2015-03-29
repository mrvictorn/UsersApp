angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/customers', {
            templateUrl: 'views/customers.html',
            controller: 'CustomersController'
        })
        .when('/persons', {
            templateUrl: 'views/persons.html',
            controller: 'PersonsController'
        });
    $locationProvider.html5Mode(true);
}]);
