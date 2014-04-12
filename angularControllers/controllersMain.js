function MainController($scope, $location, $rootScope) {
	$scope.logout = function(){
		console.log('logged out');
		$rootScope.loggedUser = null;
		$location.path( "/login" );
	}
}