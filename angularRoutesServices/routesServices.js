// Create a module for our core AMail services
var aUsers = angular.module('UsersApp', []);

// Set up our mappings between URLs, templates, and controllers
function aUsersRouteConfig($routeProvider) {
  $routeProvider.
    when('/login', {
      controller: LoginController,     
      templateUrl: 'angularTemplates/login.html'
    }).    
    when('/main', {
      controller: MainController,
      templateUrl: 'angularTemplates/main.html'  
    }).

    //otherwise({redirectTo: '/login'});
    otherwise({
      redirectTo: '/login'
    });
}

// Set up our route so the AMail service can find it
aUsers.config(aUsersRouteConfig);

// gets rid of hashes in url see: 
// http://stackoverflow.com/questions/17350412/angularjs-1-1-5-automatically-adding-hash-tag-to-urls
aUsers.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

aUsers.run( function($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ( $rootScope.loggedUser == null ) {
        // no logged user, we should be going to #login
        if ( next.templateUrl == "partials/login.html" ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( "/login" );
        }
      }         
    });
})

//Set up a service (examine comments at end of this file for an alternate pattern for setting up a service)
aUsers.factory('GenericUserService', function($http) {
  var GenericUserService = {};
  GenericUserService.query = function(requestType,firstname,lastname,institution,id,callback){
        var urlVar = 'crud?requestType='+ requestType + '&firstname=' + firstname + '&lastname=' + lastname + '&institution=' + institution + '&id=' + id;
        $http({
            url: urlVar,
            method: "GET"
            //,data: {"requestType":'createUser'} use this stuff to left to send Post params
        })
            .success(function(data, status, headers, config){
                if (callback)
                    return callback(data);
                else
                    return data;
            })
            .error(function(data, status, headers, config){
                console.log("ERROR");
            });
  };

  return GenericUserService;
});