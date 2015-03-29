angular.module('PersonsCtrl', []).controller('PersonsController', ['$scope', 'PersonsService',function($scope,PersonsService) {
	var PS = PersonsService.persons();

    $scope.deletePerson = function(pers) {
    	pers.$delete(); 
		updateList();    
  	};
  	$scope.addPerson = function() {
  		var fname = $scope.fname,
			lname = $scope.lname,
			dateOfBirth = new Date($scope.dateOfBirth);
  		if (lname.length>0 || fname.length>0) {
  			newPerson = new PS(); 
  			newPerson.name = {
  				first :$scope.fname,
  				last: $scope.lname
  			};
  			newPerson.dateOfBirth = dateOfBirth;
			newPerson.$save();
			updateList();    
			$scope.fname ='';
			$scope.lname ='';
			$scope.dateOfBirth = '';
		};
  	};
    function updateList(){
		PS.query(function(data) {
			$scope.persons = data;
	  	});
    };
    $scope.updateList = updateList;
    updateList();
}]);

