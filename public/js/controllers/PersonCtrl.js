angular.module('PersonCtrl', []).controller('PersonController', ['$scope', 'PersonService',function($scope,PersonService) {
	var PS = PersonService.persons();

    $scope.deletePerson = function(pers) {
    	pers.$delete(); 
		updateList();    
  	};
  	$scope.updatePerson = function(pers) { 
		pers.$update(); 
		updateList();   
  	};
  	$scope.addPerson = function() {
  		fname = $scope.fname;
		lname = $scope.lname;
  		if (lname.length>0 || fname.length>0) {
  			newPerson = new PS(); 
  			newPerson.name = {
  				first :$scope.fname,
  				last: $scope.lname
  			}
			newPerson.$save();
			updateList();    
			$scope.fname ='';
			$scope.lname ='';
		};
  	};
    function updateList(){
		PS.query(function(data) {
	    	$scope.persons = data;
	  	});
    };
    updateList();
    $scope.updateList = updateList;

}]);

