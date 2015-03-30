angular.module('PersonsService', []).factory('PersonsService', ['$http','$resource',function($http,$resource) {
    return {
        persons: function(){
            return $resource('/api/persons/:id',{id : '@_id'},{'update': { method: 'PUT'}});
        }
    }       
}]);
