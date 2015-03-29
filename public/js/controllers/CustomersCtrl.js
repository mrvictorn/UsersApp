angular.module('CustomersCtrl', []).controller('CustomersController', ['$scope', 'CustomersService',function($scope,CustomersService) {
	var CS = CustomersService.persons();

    $scope.deleteCustomer = function(cust) {
    	cust.$delete(); 
		  updateList();    
  	};
  	$scope.addCustomer = function() {
  		var fname = $scope.fname,
			lname = $scope.lname,
			dateOfBirth = new Date($scope.dateOfBirth),
      cname = $scope.cname,
      mphone = $scope.mphone,
      wphone = $scope.wphone;
      skype = $scope.skype;
  		if (lname.length>0 || fname.length>0 || cname.length>0) {
  			newCustomer = new CS(); 
  			newCustomer.name = {
  				first :$scope.fname,
  				last: $scope.lname
  			};
  			newCustomer.dateOfBirth = dateOfBirth;
        newCustomer.CompanyName = cname;
        newCustomer.phone = {
          mobile:mphone,
          work:wphone
        };
        newCustomer.skype = skype;
        newCustomer.$save();
        updateList();    
        $scope.fname = '';
        $scope.lname = '';
        $scope.dateOfBirth = '';
        $scope.cname = '';
        $scope.mphone = '';
        $scope.wphone = '';
        $scope.skype = '';
		  };
  	};
    function updateList(){
		  CS.query(function(data) {
			$scope.customers = data;
	  	});
    };
    updateList();
    $scope.updateList = updateList;
}]);

