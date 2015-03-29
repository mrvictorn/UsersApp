angular.module('CustomersService', []).factory('CustomersService', ['$http','$resource',function($http,$resource) {
    return {
        persons: function(){
            return $resource('/api/customers/:id',{id : '@_id'});
        }
    }       
}]);
