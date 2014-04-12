function LoginController($scope, $location, $rootScope) {
	console.log('in logincontroller');
	$scope.attemptLogin = function() {
		if ( $scope.username == $scope.password ) { // test
		    $rootScope.loggedUser = $scope.username;
		    $location.path( "/main" );
		} else {
			$rootScope.loggedUser = null;
		    $scope.loginError = "Invalid user/pass.";
		}
	};
}

