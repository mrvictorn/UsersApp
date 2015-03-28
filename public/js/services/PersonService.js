angular.module('PersonService', []).factory('PersonService', ['$http','$resource', function($http,$resource) {
    return {
        persons: function(){
            return $resource('/api/persons/:id',{id : '@_id'},{'update': { method: 'PUT'}});
        }
    }       
}]);
